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
	if request.method == 'POST':
		form = PatternForm(request.POST)
		if form.is_valid():
			pattern = form.save()
			img_data = request.POST['image'].decode('base64')
			img_file = open('%s%d.png' % ("/tmp/", pattern.pk), 'wb')
			img_file.write(img_data)
			img_file.close()
			return HttpResponse("{'id': %s}" % pattern.pk);
		else:
			response = 'Errors: '
			for key in form.errors.keys():
				value = form.errors[key]
				errors = ''
				for error in value:
					errors = errors + error + ' '
					response = response + ' ' + key + ': ' + errors
			return HttpResponse(response);