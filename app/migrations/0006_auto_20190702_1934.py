# Generated by Django 2.2.2 on 2019-07-02 19:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_auto_20190702_1913'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cached_image',
            name='gallery',
        ),
        migrations.DeleteModel(
            name='Cached_Details',
        ),
        migrations.DeleteModel(
            name='Cached_Image',
        ),
    ]
