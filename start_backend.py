#!/usr/bin/env python3
"""
Start ZenForge Backend Server
"""
import subprocess
import sys
import os
from pathlib import Path

def main():
    print("🚀 Starting ZenForge Backend Server...")
    print("=" * 50)
    
    # Ensure we're in the right directory
    backend_dir = Path(__file__).parent / "backend"
    if not backend_dir.exists():
        print("❌ Backend directory not found!")
        return 1
    
    # Change to backend directory
    os.chdir(backend_dir)
    print(f"📁 Working directory: {os.getcwd()}")
    
    # Find a Python with uvicorn installed
    # Check multiple venv locations (backend-local and project-root)
    venv_path = Path(".venv")
    root_venv_path = Path("..") / ".venv"
    
    candidates = [
        root_venv_path / "Scripts" / "python.exe",   # Root venv (Windows)
        root_venv_path / "bin" / "python.exe",        # Root venv (MSYS2)
        venv_path / "Scripts" / "python.exe",          # Backend venv (Windows)
        venv_path / "bin" / "python.exe",              # Backend venv (MSYS2)
    ]
    
    python_exe = None
    for candidate in candidates:
        if candidate.exists():
            # Verify this Python actually has uvicorn
            try:
                result = subprocess.run(
                    [str(candidate), "-c", "import uvicorn"],
                    capture_output=True, timeout=10
                )
                if result.returncode == 0:
                    python_exe = candidate
                    print(f"✅ Using Python: {candidate.resolve()}")
                    break
                else:
                    print(f"⚠️  {candidate} exists but missing uvicorn, skipping...")
            except Exception:
                continue
    
    if python_exe is None:
        print("❌ No Python with uvicorn found! Install deps with:")
        print("   pip install -r requirements.txt")
        return 1

    
    print("🔧 Starting FastAPI server...")
    print("   Host: 0.0.0.0")
    print("   Port: 8001") 
    print("   Reload: enabled")
    print()
    print("📊 Server will be available at:")
    print("   🌐 API: http://localhost:8001")
    print("   📖 Docs: http://localhost:8001/docs")
    print()
    print("🛑 Press Ctrl+C to stop the server")
    print("=" * 50)
    
    try:
        # Start uvicorn
        subprocess.run([
            str(python_exe),
            "-m", "uvicorn",
            "app.main:app",
            "--host", "0.0.0.0",
            "--port", "8001",
            "--reload"
        ])
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
        return 0
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())