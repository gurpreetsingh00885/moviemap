# Generated by Django 3.0 on 2019-12-15 04:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_movie_actors'),
    ]

    operations = [
        migrations.RenameField(
            model_name='movie',
            old_name='writers',
            new_name='writer',
        ),
    ]
