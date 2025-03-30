from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status

class SignUpView(APIView):
    permission_classes = []

    def post(self, request):
        try:
            data = request.data
            user = User.objects.create_user(
                username=data['username'],
                password=data['password']
            )

            token = Token.objects.create(user=user)
            return Response({'token': str(token)}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({"error": "username taken. Please choose another."}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = []
    
    def post(self, request):
        try:
            data = request.data

            user = authenticate(username=data['username'], password=data['password'])

            if not user:
                return Response({"error": "Invalid login credentials."}, status=400)
            try:
                token = Token.objects.get(user=user)
                
            except:
                token = Token.objects.create(user=user)
            
            return Response({"token": str(token)}, status=200)
        except Exception as e:
            return Response({"error": "Server error.Please try again later."}, status=400)