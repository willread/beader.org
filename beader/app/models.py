from django.db import models
from django.utils import timezone
import datetime

class Pattern(models.Model):
	name = models.CharField(max_length=50)
	pub_date = models.DateTimeField('date published', editable=False, auto_now_add=True, blank=True)
	width = models.PositiveIntegerField()
	height = models.PositiveIntegerField()
	mode = models.PositiveIntegerField()
	data = models.CharField(max_length=1024)
	def __unicode__(self):
		return self.name