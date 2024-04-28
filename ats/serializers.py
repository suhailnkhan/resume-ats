from rest_framework import serializers

class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
    jd = serializers.CharField(max_length=5000)  
