FROM python:3
WORKDIR /usr/src/app
COPY requirements.txt .
COPY src .
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["python", "manage", "runserver"]