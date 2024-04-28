from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import FileUploadSerializer
from rest_framework import status
from django.conf import settings
import os
from .resumeparser import  pdf_to_text , getChatGptRespose
def save_uploaded_file(uploaded_file):
        # Get the path to the media folder
        media_folder = settings.MEDIA_ROOT
        
        # Ensure the media folder exists, if not create it
        if not os.path.exists(media_folder):
            os.makedirs(media_folder)
        
        # Define the file path where the file will be saved
        file_path = os.path.join(media_folder, uploaded_file.name)

        # Write the uploaded file to the media folder
        with open(file_path, 'wb+') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)

        return file_path
    
class ResumeAts(APIView):
    def get(self, request, *args, **kwargs):
        return Response({"data": "data"})   
    def post(self, request, format=None):
        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            uploaded_file = serializer.validated_data['file']
            jd = serializer.validated_data['jd']  
            file_path = save_uploaded_file(uploaded_file)
            text = pdf_to_text(file_path)
            response = getChatGptRespose(text,jd )
            return Response({'message': 'File uploaded successfully'  , 'response' : response}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)