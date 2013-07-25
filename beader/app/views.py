from django.shortcuts import render, get_object_or_404
from django.core.urlresolvers import reverse
from django.utils import timezone
from django.http import HttpResponseRedirect, HttpResponse, Http404
from app.models import Pattern
from app.forms import PatternForm

def index(request):
    context = {}
    return render(request, 'app/index.html', context)
    
def design(request):
	context = {}
	return render(request, "app/design.html", context);
    
def save(request):
	context = {}
	return render(request, "app/design.html", context);