from django.http import HttpResponseRedirect, HttpResponse, HttpResponseForbidden, Http404
from django.shortcuts import render, render_to_response, get_object_or_404
from django.conf import settings
from django.contrib import auth
from django.core.paginator import Paginator, InvalidPage, EmptyPage
from django.core.urlresolvers import reverse
from django.template import RequestContext
from django.utils import timezone
from app.models import Pattern
from app.forms import PatternForm

def index(request):
	'''Main index page'''
	patterns = Pattern.objects.all().order_by('-pub_date')
	paginator = Paginator(patterns, 10)
	
	try: page = int(request.GET.get('page', '1'))
	except ValueError: page = 1
	
	try: posts = paginator.page(page)
	except (InvalidPage, EmptyPage): posts = paginator.page(paginator.num_pages)
	
	context = {
		'patterns': patterns
	}
	return render_to_response('app/index.html', context, context_instance=RequestContext(request))
    
def design(request):
	context = {}
	return render(request, 'app/design.html', context);
    
def save(request):
	if request.method == 'POST':
		form = PatternForm(request.POST)
		if form.is_valid():
			pattern = form.save()
			img_data = request.POST['image'].decode('base64')
			img_file = open('%s/%d.png' % (settings.IMAGES_PATH, pattern.pk), 'wb')
			img_file.write(img_data)
			img_file.close()
			return HttpResponse("""{"id": %s}""" % pattern.pk)
		else:
			response = 'Errors: '
			for key in form.errors.keys():
				value = form.errors[key]
				errors = ''
				for error in value:
					errors = errors + error + ' '
					response = response + ' ' + key + ': ' + errors
			return HttpResponse(response);
			
def image(request, pattern_id):
	img_data = open('%s/%d.png' % (settings.IMAGES_PATH, int(pattern_id)), 'rb').read()
	return HttpResponse(img_data, content_type='image/png')
	
def login(request):
	if request.method == 'POST' and request.POST['username'] and request.POST['password']:
		user = auth.authenticate(username=request.POST['username'], password=request.POST['password'])
		if user is not None:
			if user.is_active:
				auth.login(request, user)
				return HttpResponse()
			else:
				return HttpResponseForbidden()
		else:
			return HttpResponseForbidden()
	else:
		return HttpResponseForbidden()
		
def logout(request):
	auth.logout(request)
	return HttpResponseRedirect(reverse('app:index'))