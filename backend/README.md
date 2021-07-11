# Instruction for setting up Backend server

1. Please download MySQL and set up your username and password

2. Create a database for superb

```sql
CREATE database superb;
```

3. Create a `.env` file that contains a variable of `SQLALCHEMY_DATABASE_URI`.

```
SQLALCHEMY_DATABASE_URI=mysql+pymysql://<user>:<password>@127.0.0.1:3306/superb
```

4. Install requirements and unzip required files

```bash
./prepare.sh
```

5. In `backend/` run
- For development
```bash
python3 app.py
```
- For production
```bash
uwsgi --ini app.ini
```
