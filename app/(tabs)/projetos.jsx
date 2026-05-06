import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  ActivityIndicator, TouchableOpacity, Linking
} from 'react-native';
import { API_URL } from '../../constants/api';
import { useTheme } from '../../constants/ThemeContext';

export default function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    fetch(`${API_URL}/pessoas`)
      .then(res => res.json())
      .then(data => fetch(`${API_URL}/pessoas/${data[0].id}/projetos`))
      .then(res => res.json())
      .then(data => { setProjetos(data); setLoading(false); })
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
        <Text style={styles.headerTitle}>🚀 Projetos</Text>
      </View>
      {projetos.map(item => (
        <View key={item.id} style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.titulo, { color: theme.text }]}>{item.titulo}</Text>
          {item.descricao && (
            <Text style={[styles.descricao, { color: theme.subtext }]}>{item.descricao}</Text>
          )}
          {item.tecnologias && (
            <View style={styles.techContainer}>
              {item.tecnologias.split(',').map((tech, index) => (
                <View key={index} style={[styles.techBadge, { backgroundColor: theme.primaryLight }]}>
                  <Text style={[styles.techText, { color: theme.primary }]}>{tech.trim()}</Text>
                </View>
              ))}
            </View>
          )}
          {item.url && (
            <TouchableOpacity
              style={[styles.linkButton, { backgroundColor: theme.primary }]}
              onPress={() => Linking.openURL(`https://${item.url}`)}
            >
              <Text style={styles.linkText}>🔗 Ver projeto</Text>
            </TouchableOpacity>
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
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  descricao: { fontSize: 14, lineHeight: 22, marginBottom: 12 },
  techContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  techBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  techText: { fontSize: 12, fontWeight: '600' },
  linkButton: { padding: 12, borderRadius: 10, alignItems: 'center' },
  linkText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});