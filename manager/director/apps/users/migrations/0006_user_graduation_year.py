# Generated by Django 2.2.12 on 2020-05-05 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20200407_1032'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='graduation_year',
            field=models.PositiveSmallIntegerField(blank=True, default=None, null=True),
        ),
    ]
