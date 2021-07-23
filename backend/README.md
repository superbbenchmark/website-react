# Instruction for setting up Backend server

1. Create a `.env` file that contains a variable of `SQLALCHEMY_DATABASE_URI`.

```
SQLALCHEMY_DATABASE_URI=mysql+pymysql://<username>:<password>@127.0.0.1:3306/superb
```

2. Install requirements and unzip required files

```bash
./prepare.sh
```

3. In `backend/` run
- For development
```bash
python3 app.py
```
- For production (w/o independent environment)
```bash
uwsgi --ini app.ini
```
- For production (w/ independent environment) **[Recommended]**
1. Install `pipenv`
```bash
pip3 install pipenv
pipenv --three
pipenv install
```
2. Get the path of virtual env directory
```bash
pipenv --venv
```
3. Append `app.ini` with the virtual env directory
```ini
virtualenv = <path to the virtual directory>
```
4. Start server with
```bash
<path to the virtual directory>/bin/uwsgi --ini app.ini
```
