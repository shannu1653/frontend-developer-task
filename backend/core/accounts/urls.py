from django.urls import path
from .views import RegisterView, ProfileView, EmailTokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', EmailTokenObtainPairView.as_view(), name="login"),
    path('profile/', ProfileView.as_view(), name="profile"),
]
