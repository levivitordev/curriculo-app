import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  ActivityIndicator, Switch
} from 'react-native';
import { API_URL } from '../../constants/api';
import { useTheme } from '../../constants/ThemeContext';

export default function Home() {
  const [pessoa, setPessoa] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme, isDark, toggleTheme } = useTheme();

  useEffect(() => {
    fetch(`${API_URL}/pessoas`)
      .then(res => res.json())
      .then(data => { setPessoa(data[0]); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.header }]}>

        {/* Switch no canto superior direito dentro do header */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchIcon}>{isDark ? '🌙' : '☀️'}</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: 'rgba(255,255,255,0.3)', true: 'rgba(255,255,255,0.3)' }}
            thumbColor={'#fff'}
            ios_backgroundColor="rgba(255,255,255,0.3)"
          />
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {pessoa?.nome?.charAt(0)}
          </Text>
        </View>
        <Text style={styles.nome}>{pessoa?.nome}</Text>
        <Text style={styles.cargo}>Dev em Formação</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>📍 {pessoa?.cidade}, {pessoa?.estado}</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Sobre mim</Text>
        <Text style={[styles.cardText, { color: theme.subtext }]}>{pessoa?.resumo}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Contato</Text>
        <Text style={[styles.cardText, { color: theme.subtext }]}>📧 {pessoa?.email}</Text>
        {pessoa?.telefone && <Text style={[styles.cardText, { color: theme.subtext }]}>📱 {pessoa?.telefone}</Text>}
        {pessoa?.linkedin && <Text style={[styles.cardText, { color: theme.subtext }]}>💼 {pessoa?.linkedin}</Text>}
        {pessoa?.github && <Text style={[styles.cardText, { color: theme.subtext }]}>🐙 {pessoa?.github}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  switchContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  switchIcon: { fontSize: 16 },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 12, elevation: 5,
  },
  avatarText: { fontSize: 40, fontWeight: 'bold', color: '#6C63FF' },
  nome: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  cargo: { fontSize: 14, color: '#E0DEFF', marginBottom: 12 },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20,
  },
  badgeText: { color: '#fff', fontSize: 13 },
  card: {
    margin: 16, marginBottom: 0, padding: 20, borderRadius: 16,
    elevation: 3, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  cardText: { fontSize: 14, marginBottom: 6, lineHeight: 22 },
});