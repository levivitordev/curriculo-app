import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../constants/ThemeContext';

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.muted,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} /> }} />
      <Tabs.Screen name="academico" options={{ title: 'Acadêmico', tabBarIcon: ({ color, size }) => <Ionicons name="school" color={color} size={size} /> }} />
      <Tabs.Screen name="profissional" options={{ title: 'Profissional', tabBarIcon: ({ color, size }) => <Ionicons name="briefcase" color={color} size={size} /> }} />
      <Tabs.Screen name="projetos" options={{ title: 'Projetos', tabBarIcon: ({ color, size }) => <Ionicons name="code-slash" color={color} size={size} /> }} />
      <Tabs.Screen name="sobre" options={{ title: 'Sobre', tabBarIcon: ({ color, size }) => <Ionicons name="information-circle" color={color} size={size} /> }} />
    </Tabs>
  );
}