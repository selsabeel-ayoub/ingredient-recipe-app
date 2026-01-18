import { StyleSheet } from 'react-native';

export const theme = {
  colors: {
    primary: '#F9D1D1',      // Soft Pastel Pink
    secondary: '#FFE4E4',    // Lighter Pink (for loading/disabled)
    background: '#FFF5F5',   // Very Light Pink background
    card: '#FFFFFF',         // White cards
    text: '#5D4E4E',         // Soft Brownish-Grey
    danger: '#FF8080',       // Muted Coral for deletes
    border: '#E8B4B4',       // Dusty Rose
  }
};

export const globalStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: theme.colors.background, 
    paddingTop: 60 
  },
  header: { 
    fontSize: 40, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20,
    color: theme.colors.text
  },
  shelf: { 
    justifyContent: 'flex-start', 
    borderBottomWidth: 4, 
    borderBottomColor: theme.colors.border, 
    marginBottom: 20 
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    elevation: 2,
  },
  box: { 
    width: '31%',                
    marginRight: '3.5%',         
    marginBottom: 15,           
    height: 100, 
    borderWidth: 2, 
    borderColor: theme.colors.border,
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'relative',
    backgroundColor: theme.colors.card,
    borderRadius: 15,
  },
  text: { 
    fontWeight: 'bold',
    color: theme.colors.text
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    color: theme.colors.danger 
  },
  modalContent: { 
    flex: 1, 
    backgroundColor: theme.colors.background, 
    marginTop: 50 
  },
  scrollContainer: { 
    padding: 30, 
    paddingBottom: 60 
  },
  recipeTitle: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#D48181', 
    marginBottom: 20 
  },
  sectionHeader: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginTop: 20, 
    color: theme.colors.text 
  },
  bodyText: { 
    fontSize: 17, 
    lineHeight: 26, 
    color: theme.colors.text 
  },
  closeButton: { 
    marginTop: 40, 
    padding: 18, 
    backgroundColor: theme.colors.text, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  closeButtonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  recipeOption: {
    backgroundColor: theme.colors.card,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    elevation: 1,
  },
  recipeOptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1,
  },
  recipeOptionArrow: {
    fontSize: 24,
    color: '#D48181',
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
});