from rest_framework import serializers
from .models import ToDo

class ToDoSerializer(serializers.ModelSerializer):
    created_at = serializers.ReadOnlyField()
    completed = serializers.ReadOnlyField()

    class Meta:
        model  = ToDo
        fields = ['id', 'title', 'memo', 'created_at', 'completed']
    
    def validate(self, data):
        user = self.context['request'].user
        title = data.get('title').strip().lower()

        if ToDo.objects.filter(user=user, title__iexact=title).exists():
            raise serializers.ValidationError({"detail": "You already have a similar todo."})
        return data

class ToDoToggleCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = ['id']
        read_only_fields = ['title', 'memo', 'created', 'completed']