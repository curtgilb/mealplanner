Setting up an Python Environment
If not already installed, pip install virutalenv

python -m venv env
env/Scripts/Activate // source env/bin/activate on mac

pip freeze > requirements.txt
pip install -r requirements.txt


Docker
Bulding the Image once docker file is completed
docker build --tag <optional name> <directory of Dockerfile>

Running the image as a container
docker run -p hostP:containerP <image-name>

Remove an image
docker image rn