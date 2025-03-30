from rest_framework import generics, permissions
from rest_framework.exceptions import NotAuthenticated
from .serializers import ToDoSerializer, ToDoToggleCompleteSerializer
from .models import ToDo


class TodoListCreate(generics.ListCreateAPIView):
    serializer_class = ToDoSerializer

    def get_queryset(self):
        return ToDo.objects.filter(user = self.request.user).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(user= self.request.user) # logged in user creates the todo.

class ToDoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ToDoSerializer

    def get_queryset(self):
        return ToDo.objects.filter(user=self.request.user)

class TodoToggleComplete(generics.UpdateAPIView):
    serializer_class = ToDoToggleCompleteSerializer
    
    def get_queryset(self):
        return ToDo.objects.filter(user=self.request.user)
    
    def perform_update(self, serializer):
        serializer.instance.completed = not(serializer.instance.completed)
        serializer.save()