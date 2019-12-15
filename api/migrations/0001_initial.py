# Generated by Django 3.0 on 2019-12-15 03:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10000)),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=10000)),
            ],
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10000)),
            ],
        ),
        migrations.CreateModel(
            name='Actor',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.Person')),
            ],
            bases=('api.person',),
        ),
        migrations.CreateModel(
            name='Director',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.Person')),
            ],
            bases=('api.person',),
        ),
        migrations.CreateModel(
            name='Distributor',
            fields=[
                ('company_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.Company')),
            ],
            bases=('api.company',),
        ),
        migrations.CreateModel(
            name='ProductionCompany',
            fields=[
                ('company_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.Company')),
            ],
            bases=('api.company',),
        ),
        migrations.CreateModel(
            name='Writer',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.Person')),
            ],
            bases=('api.person',),
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=10000)),
                ('release_year', models.IntegerField()),
                ('locations', models.ManyToManyField(to='api.Location')),
                ('director', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Director')),
                ('distributor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Distributor')),
                ('production_company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.ProductionCompany')),
                ('writers', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Writer')),
            ],
        ),
    ]
