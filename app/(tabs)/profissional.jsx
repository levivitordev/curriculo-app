import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { API_URL } from '../../constants/api';
import { useTheme } from '../../constants/ThemeContext';

export default function Profissional() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    fetch(`${API_URL}/pessoas`)
      .then(res => res.json())
      .then(data => fetch(`${API_URL}/pessoas/${data[0].id}/experiencias`))
      .then(res => res.json())
      .then(data => { setExperiencias(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  if (loading) return (
    <View style={[styles.center, { backgroundColor: theme.background }]}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.header }]}>
        <Text style={styles.headerTitle}>💼 Experiência Profissional</Text>
      </View>
      {experiencias.map(item => (
        <View key={item.id} style={[styles.card, { backgroundColor: theme.card }]}>
          {item.atual && (
            <View style={styles.atualBadge}>
              <Text style={styles.atualText}>● Atual</Text>
            </View>
          )}
          <Text style={[styles.cargo, { color: theme.text }]}>{item.cargo}</Text>
          <Text style={[styles.empresa, { color: theme.primary }]}>{item.empresa}</Text>
          <Text style={[styles.periodo, { color: theme.muted }]}>
            {new Date(item.data_inicio).getFullYear()} —{' '}
            {item.data_fim ? new Date(item.data_fim).getFullYear() : 'Presente'}
          </Text>
          {item.descricao && (
            <Text style={[styles.descricao, { color: theme.subtext }]}>{item.descricao}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    paddingTop: 60, paddingBottom: 30, paddingHorizontal: 24,
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginBottom: 8,
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  card: {
    margin: 16, marginBottom: 0, padding: 20, borderRadius: 16,
    elevation: 3, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8,
  },
  atualBadge: {
    backgroundColor: '#E8F5E9', alignSelf: 'flex-start',
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginBottom: 10,
  },
  atualText: { color: '#4CAF50', fontSize: 12, fontWeight: '600' },
  cargo: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  empresa: { fontSize: 14, marginBottom: 6 },
  periodo: { fontSize: 13, marginBottom: 10 },
  descricao: { fontSize: 14, lineHeight: 22 },
});