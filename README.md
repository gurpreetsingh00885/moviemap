# MovieMap

Deployed here: http://moviemap22.herokuapp.com/

## Local Setup (Staging Only)

Ensure that you have **python3** and **virtualenv** installed already.

1. Create a virtual environment and activate it
```
$ virtualenv -p python3 venv
$ source venv/bin/activate
```
2. Change working directory to the project directory
```
$ cd moviemap
```
3. Install all the requirements
```
(venv) $ pip install -r requirements.txt
```
4. Run database migrations.
```
(venv) $ python manage.py migrate
```
5. Load data into database
```
(venv) $ python manage.py shell
```
```
>>> from api.helpers import load_data
>>> load_data()
```
This will take some time.
After this is done, exit.
```
>>> exit()
```
6. Run the server
```
(venv) $ python manage.py runserver 0:8000
```
7. Open http://localhost:8000/ in your browser.
