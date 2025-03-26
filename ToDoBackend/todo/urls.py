from django.urls import path
from .views import TodoListCreate, ToDoRetrieveUpdateDestroy, TodoToggleComplete

urlpatterns = [
    path('todos/', TodoListCreate.as_view(), name='todo-list'),
    path('todos/<int:pk>/', ToDoRetrieveUpdateDestroy.as_view(), name='todo-detail'),
    path('todos/complete/<int:pk>/', TodoToggleComplete.as_view(), name='todo-complete')   
]