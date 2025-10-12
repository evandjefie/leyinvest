import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { googleCallback } from '@/store/slices/authSlice';
import { toast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const GoogleCallback = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');

      if (error) {
        toast({
          title: "Erreur d'autorisation",
          description: "L'autorisation Google a été refusée.",
          variant: "destructive"
        });
        navigate('/auth/login');
        return;
      }

      if (!code) {
        toast({
          title: "Erreur de callback",
          description: "Code d'autorisation manquant.",
          variant: "destructive"
        });
        navigate('/auth/login');
        return;
      }

      try {
        const result = await dispatch(googleCallback({ code, state: state || undefined }));
        
        if (googleCallback.fulfilled.match(result)) {
          const isGoogleSignup = localStorage.getItem('google_signup') === 'true';
          const response = result.payload as any;
          
          // Vérifier si l'utilisateur doit compléter son profil
          // Si c'est marqué comme inscription ou si needs_profile_completion est true
          const needsProfileCompletion = isGoogleSignup || response.needs_profile_completion || response.is_new_user;
          
          if (needsProfileCompletion) {
            // C'est une inscription ou profil incomplet, rediriger vers CompleteProfilePage
            localStorage.setItem('google_signup', 'true');
            toast({
              title: "Connexion Google réussie !",
              description: "Veuillez finaliser votre profil.",
            });
            navigate('/auth/complete-profile');
          } else {
            // Profil complet, connexion directe
            localStorage.removeItem('google_signup');
            toast({
              title: "Connexion réussie !",
              description: "Vous êtes maintenant connecté.",
            });
            navigate('/dashboard');
          }
        } else if (googleCallback.rejected.match(result)) {
          toast({
            title: "Erreur de connexion",
            description: result.error.message || "Erreur lors de la connexion Google.",
            variant: "destructive"
          });
          navigate('/auth/login');
        }
      } catch (err) {
        console.error('Google callback error:', err);
        toast({
          title: "Erreur de connexion",
          description: "Une erreur inattendue s'est produite.",
          variant: "destructive"
        });
        navigate('/auth/login');
      }
    };

    handleGoogleCallback();
  }, [dispatch, navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <h2 className="text-xl font-semibold text-foreground">
          Connexion en cours...
        </h2>
        <p className="text-muted-foreground">
          Veuillez patienter pendant que nous finalisons votre connexion.
        </p>
        {error && (
          <div className="text-destructive text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;
