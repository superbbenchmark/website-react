# Instruction for setting up Backend server

1. Please download MySQL and set up your username and password

2. Create a database for superb

```sql
CREATE database superb;
```

3. Change your database URI in app.py (These configs might be moved to a sperate file in the future.)

```python
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:root@127.0.0.1:3306/superb"
# Change your uri
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://<user>:<password>@<host>:<port>/<database>"
```

4. Install and download requirements

```bash
./prepare.sh
```

5. In backend/ run

```bash
python3 app.py
```
