# Generated by Django 2.0.1 on 2018-01-03 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('elections', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='election',
            name='reference_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='election',
            unique_together={('name', 'date')},
        ),
    ]
