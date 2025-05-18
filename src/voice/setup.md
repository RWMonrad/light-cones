# Voice Technology Integration

## How to Install

```bash
# Install directly from GitHub
pip install git+https://github.com/nari-labs/dia.git

# Set the HF_TOKEN ENV var to auto download config from HF Hub
export HF_TOKEN="your token"
```

## How to Use

```bash
# Clone the repository
git clone https://github.com/nari-labs/dia.git
cd dia && uv run app.py
```

Or if UV is not pre-installed:

```bash
git clone https://github.com/nari-labs/dia.git
cd dia
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\bin\activate
pip install -e .
python app.py
```

## Integration with Light Cones

We'll use this voice technology to:
1. Create voice explanations for simulations in the Simulation Lab
2. Allow voice-based challenges in the Challenge Arena
3. Provide spoken answers in the Knowledge Portal

Note: This will be integrated in the next phase of development.
