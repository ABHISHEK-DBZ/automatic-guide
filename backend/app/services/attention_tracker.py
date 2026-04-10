"""
Affective Computing Service - Attention & Fatigue Detection
Uses MediaPipe for real-time analysis of student engagement
"""

import logging
from typing import Dict, Optional, List
from datetime import datetime, timedelta
import time

try:
    import numpy as np
except ImportError:
    np = None

logger = logging.getLogger(__name__)

try:
    import cv2
    import mediapipe as mp
    ATTENTION_AVAILABLE = True
except ImportError as e:
    ATTENTION_AVAILABLE = False
    logger.warning(f"Attention tracking dependencies not available: {e}")

class AttentionTracker:
    """Track student attention and fatigue using webcam"""

    def __init__(self):
        # Initialize basic tracking state
        self.blink_count = 0
        self.last_blink_time = None
        self.blink_timestamps = []
        self.gaze_away_count = 0
        self.start_time = datetime.now()
        
        # Thresholds
        self.EYE_AR_THRESH = 0.21
        self.BLINK_WINDOW = 60
        self.FATIGUE_BLINK_RATE = 20
        self.ATTENTION_THRESHOLD = 0.7

        # Try to initialize MediaPipe Face Mesh
        if ATTENTION_AVAILABLE:
            try:
                self.mp_face_mesh = mp.solutions.face_mesh
                self.face_mesh = self.mp_face_mesh.FaceMesh(
                    max_num_faces=1,
                    refine_landmarks=True,
                    min_detection_confidence=0.5,
                    min_tracking_confidence=0.5
                )
                logger.info("MediaPipe Face Mesh initialized successfully")
            except Exception as e:
                logger.warning(f"Failed to initialize MediaPipe Face Mesh: {e}")
                self.face_mesh = None
        else:
            self.face_mesh = None

        # Initialize OpenCV Haar Cascades as fallback
        try:
            face_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
            self.face_cascade = cv2.CascadeClassifier(face_path)
            if self.face_cascade.empty():
                logger.warning("Failed to load Haar Cascade face classifier")
            else:
                logger.info("OpenCV Haar Cascade fallback initialized")
        except Exception as e:
            logger.warning(f"Error loading Haar Cascades: {e}")
            self.face_cascade = None

    def calculate_eye_aspect_ratio(self, eye_landmarks: List) -> float:
        """Calculate Eye Aspect Ratio (EAR) for blink detection"""
        # Vertical eye distances
        vertical1 = np.linalg.norm(np.array(eye_landmarks[1]) - np.array(eye_landmarks[5]))
        vertical2 = np.linalg.norm(np.array(eye_landmarks[2]) - np.array(eye_landmarks[4]))

        # Horizontal eye distance
        horizontal = np.linalg.norm(np.array(eye_landmarks[0]) - np.array(eye_landmarks[3]))

        # EAR calculation
        ear = (vertical1 + vertical2) / (2.0 * horizontal)
        return ear

    def detect_blink(self, left_ear: float, right_ear: float) -> bool:
        """Detect if a blink occurred"""
        avg_ear = (left_ear + right_ear) / 2.0

        if avg_ear < self.EYE_AR_THRESH:
            current_time = time.time()
            if self.last_blink_time is None or (current_time - self.last_blink_time) > 0.3:
                self.blink_count += 1
                self.blink_timestamps.append(current_time)
                self.last_blink_time = current_time

                # Clean old timestamps
                cutoff = current_time - self.BLINK_WINDOW
                self.blink_timestamps = [t for t in self.blink_timestamps if t > cutoff]

                return True

        return False

    def calculate_blink_rate(self) -> float:
        """Calculate blinks per minute"""
        if not self.blink_timestamps:
            return 0.0

        time_window = min(self.BLINK_WINDOW, time.time() - self.blink_timestamps[0])
        if time_window == 0:
            return 0.0

        return (len(self.blink_timestamps) / time_window) * 60

    def detect_gaze_direction(self, face_landmarks) -> Dict[str, float]:
        """Detect if student is looking at screen"""
        # Get nose tip and forehead landmarks for head pose
        nose_tip = face_landmarks.landmark[1]
        forehead = face_landmarks.landmark[10]

        # Calculate gaze alignment (simplified)
        # In production, use proper head pose estimation
        gaze_x = nose_tip.x - 0.5  # Center is 0.5
        gaze_y = nose_tip.y - 0.5

        alignment_score = 1.0 - (abs(gaze_x) + abs(gaze_y))

        return {
            "gaze_x": gaze_x,
            "gaze_y": gaze_y,
            "alignment_score": max(0, alignment_score),
            "looking_at_screen": alignment_score > self.ATTENTION_THRESHOLD
        }

    def analyze_frame_haar(self, frame_gray: np.ndarray) -> Optional[Dict]:
        """Fallback face detection using Haar Cascades"""
        if not self.face_cascade:
            return None

        # Detect faces
        faces = self.face_cascade.detectMultiScale(frame_gray, 1.1, 4)
        if len(faces) == 0:
            return None

        # Take the largest face
        (x, y, w, h) = sorted(faces, key=lambda f: f[2] * f[3], reverse=True)[0]
        
        # Calculate centers
        img_h, img_w = frame_gray.shape
        center_x, center_y = x + w/2, y + h/2
        
        # Simplified gaze alignment: Is the face centered?
        gaze_x = (center_x / img_w) - 0.5
        gaze_y = (center_y / img_h) - 0.5
        alignment_score = 1.0 - (abs(gaze_x) + abs(gaze_y))

        return {
            "face_detected": True,
            "looking_at_screen": alignment_score > self.ATTENTION_THRESHOLD,
            "blink_detected": False,
            "blink_count": 0,
            "blink_rate": 0,
            "is_fatigued": False,
            "eye_aspect_ratio": 0.25,
            "attention_score": max(0, alignment_score),
            "fatigue_score": 0.1,
            "gaze_alignment": round(alignment_score, 2),
            "looking_at_screen_prob": alignment_score,
            "attention_level": "high" if alignment_score > self.ATTENTION_THRESHOLD else "low",
            "is_calibrated": True
        }

    def analyze_frame(self, frame: np.ndarray) -> Optional[Dict]:
        """Analyze single frame for attention metrics using best available method"""
        try:
            # Always try to convert to grayscale for Haar fallback or general pre-processing
            frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            # 1. Try MediaPipe (Detailed landmark-based analysis)
            if self.face_mesh:
                try:
                    # Convert BGR to RGB for MediaPipe
                    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                    results = self.face_mesh.process(rgb_frame)

                    if results and results.multi_face_landmarks:
                        face_landmarks = results.multi_face_landmarks[0]
                        landmarks = face_landmarks.landmark
                        
                        # Extract eye landmarks
                        left_eye = [[landmarks[i].x, landmarks[i].y] for i in [33, 160, 158, 133, 153, 144]]
                        right_eye = [[landmarks[i].x, landmarks[i].y] for i in [362, 385, 387, 263, 373, 380]]

                        # Calculate EAR and Gaze
                        left_ear = self.calculate_eye_aspect_ratio(left_eye)
                        right_ear = self.calculate_eye_aspect_ratio(right_eye)
                        blinked = self.detect_blink(left_ear, right_ear)
                        blink_rate = self.calculate_blink_rate()
                        gaze_info = self.detect_gaze_direction(face_landmarks)

                        return {
                            "timestamp": datetime.now().isoformat(),
                            "face_detected": True,
                            "blink_detected": blinked,
                            "blink_count": self.blink_count,
                            "blink_rate": round(blink_rate, 2),
                            "is_fatigued": blink_rate > self.FATIGUE_BLINK_RATE,
                            "gaze_alignment": round(gaze_info["alignment_score"], 2),
                            "looking_at_screen": gaze_info["looking_at_screen"],
                            "attention_level": "high" if gaze_info["looking_at_screen"] and blink_rate <= self.FATIGUE_BLINK_RATE else "medium" if gaze_info["looking_at_screen"] else "low",
                            "method": "mediapipe"
                        }
                except Exception as e:
                    logger.warning(f"MediaPipe analysis failed: {e}")

            # 2. Fallback: OpenCV Haar Cascades (Basic face detection)
            haar_metrics = self.analyze_frame_haar(frame_gray)
            if haar_metrics:
                haar_metrics["timestamp"] = datetime.now().isoformat()
                haar_metrics["method"] = "haar"
                return haar_metrics

            return None
        except Exception as e:
            logger.error(f"Frame analysis error: {e}")
            return None

    def get_intervention_recommendation(self, metrics: Dict) -> Optional[str]:
        """Recommend LLM intervention based on attention metrics"""
        if metrics["is_fatigued"]:
            return "fatigue_detected"

        if not metrics["looking_at_screen"]:
            return "attention_drift"

        if metrics["attention_level"] == "low":
            return "low_engagement"

        return None

    def reset(self):
        """Reset tracking state"""
        self.blink_count = 0
        self.last_blink_time = None
        self.blink_timestamps = []
        self.gaze_away_count = 0
        self.start_time = datetime.now()

    def _get_empty_metrics(self) -> Dict:
        """Return default empty metrics when analysis is unavailable."""
        return {
            "timestamp": datetime.now().isoformat(),
            "face_detected": False,
            "blink_detected": False,
            "blink_count": 0,
            "blink_rate": 0,
            "is_fatigued": False,
            "gaze_alignment": 0.5,
            "looking_at_screen": False,
            "attention_level": "medium",
        }
