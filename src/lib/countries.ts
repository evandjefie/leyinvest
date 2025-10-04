export interface Country {
    name: string;
    code: string; // ex: 'CI'
    dial_code: string; // ex: '+225'
  }
  
  export const countries: Country[] = [
    { code: 'BJ', name: 'Bénin', dial_code: '+229' },
    { code: 'BF', name: 'Burkina Faso', dial_code: '+226' },
    { code: 'CI', name: 'Côte d\'Ivoire', dial_code: '+225' },
    { code: 'GN', name: 'Guinée', dial_code: '+224' },
    { code: 'ML', name: 'Mali', dial_code: '+223' },
    { code: 'NE', name: 'Niger', dial_code: '+227' },
    { code: 'SN', name: 'Sénégal', dial_code: '+221' },
    { code: 'TG', name: 'Togo', dial_code: '+228' },
    { code: 'CM', name: 'Cameroun', dial_code: '+237' },
    { code: 'GA', name: 'Gabon', dial_code: '+241' },
    { code: 'GQ', name: 'Guinée équatoriale', dial_code: '+240' },
    { code: 'CF', name: 'République centrafricaine', dial_code: '+236' },
    { code: 'CG', name: 'République du Congo', dial_code: '+242' },
    { code: 'CD', name: 'République démocratique du Congo', dial_code: '+243' },
    { code: 'TD', name: 'Tchad', dial_code: '+235' },
    { name: 'France', code: 'FR', dial_code: '+33' },
    { name: 'États-Unis', code: 'US', dial_code: '+1' },

  ];