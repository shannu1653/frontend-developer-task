from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import re

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('email', 'password')

    def validate_password(self, value):
        if not re.search(r"[A-Z]", value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")

        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise serializers.ValidationError("Password must contain at least one special character.")

        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")

        return value

    def create(self, validated_data):
        email = validated_data['email']

        user = User.objects.create(
            email=email,
            username=email.split('@')[0]
        )

        user.set_password(validated_data['password'])
        user.save()
        return user



class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'
