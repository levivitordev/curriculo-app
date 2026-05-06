import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { API_URL } from '../../constants/api';
import { useTheme } from '../../constants/ThemeContext';

export default function Sobre() {
  const [habilidades, setHabilidades] = useState([]);
  const [idiomas, setIdiomas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    fetch(`${API_URL}/pessoas`)
      .then(res => res.json())
      .then(data => {
        const pessoaId = data[0].id;
        return Promise.all([
          fetch(`${API_URL}/pessoas/${pessoaId}/habilidades`).then(r => r.json()),
          fetch(`${API_URL}/pessoas/${pessoaId}/idiomas`).then(r => r.json()),
        ]);
      })
      .then(([hab, idiom]) => {
        setHabilidades(hab);
        setIdiomas(idiom);
        setLoading(false);
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  if (loading) return (
    <View style={[styles.center, { backgroundColor: theme.background }]}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  );

  const categorias = [...new Set(habilidades.map(h => h.categoria))];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.header }]}>
        <Text style={styles.headerTitle}>ℹ️ Sobre o App</Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>🛠️ Tecnologias utilizadas</Text>
        {['React Native + Expo', 'Expo Router (navegação)', 'API REST com Express.js', 'PostgreSQL (NeonDB)', 'Vercel'].map(t => (
          <Text key={t} style={[styles.item, { color: theme.subtext }]}>• {t}</Text>
        ))}
      </View>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>⭐ Funcionalidade extra</Text>
        <Text style={[styles.item, { color: theme.subtext }]}>• Modo escuro/claro disponível na tela Home</Text>
        <Text style={[styles.item, { color: theme.subtext }]}>• Alterna entre os temas com um Switch</Text>
        <Text style={[styles.item, { color: theme.subtext }]}>• Todas as telas se adaptam ao tema escolhido</Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>💡 Habilidades</Text>
        {categorias.map(cat => (
          <View key={cat} style={styles.categoriaContainer}>
            <Text style={[styles.categoria, { color: theme.primary }]}>{cat}</Text>
            <View style={styles.techContainer}>
              {habilidades.filter(h => h.categoria === cat).map(h => (
                <View key={h.id} style={[styles.techBadge, { backgroundColor: theme.primaryLight }]}>
                  <Text style={[styles.techText, { color: theme.primary }]}>{h.nome}</Text>
                  <Text style={[styles.nivelText, { color: theme.muted }]}>{h.nivel}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.card, { backgroundColor: theme.card, marginBottom: 30 }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>🌍 Idiomas</Text>
        {idiomas.map(item => (
          <View key={item.id} style={styles.idiomaRow}>
            <Text style={[styles.idioma, { color: theme.text }]}>{item.idioma}</Text>
            <View style={[styles.nivelBadge, { backgroundColor: theme.primaryLight }]}>
              <Text style={[styles.nivelBadgeText, { color: theme.primary }]}>{item.nivel}</Text>
            </View>
          </View>
        ))}
      </View>
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
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  item: { fontSize: 14, marginBottom: 6, lineHeight: 22 },
  categoriaContainer: { marginBottom: 12 },
  categoria: { fontSize: 13, fontWeight: '700', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  techContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  techBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, alignItems: 'center' },
  techText: { fontSize: 12, fontWeight: '600' },
  nivelText: { fontSize: 10, marginTop: 2 },
  idiomaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  idioma: { fontSize: 15, fontWeight: '500' },
  nivelBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  nivelBadgeText: { fontSize: 12, fontWeight: '600', textTransform: 'capitalize' },
});