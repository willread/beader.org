from django import forms
from app.models import Pattern

class PatternForm(forms.ModelForm):
	class Meta:
		model = Pattern