
from django.urls import path 
from ats.views import ResumeAts

urlpatterns = [
        path('submit-resume/', ResumeAts.as_view()),
]
