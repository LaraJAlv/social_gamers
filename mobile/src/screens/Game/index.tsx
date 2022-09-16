import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { GameParams } from "../../@types/navigation";
import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from "../../components/Background";
import { Heading } from '../../components/Heading';

import { styles } from "./styles";
import { THEME } from '../../theme';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();
  const [ads, setAds] = useState<Array<DuoCardProps>>([]);
  const [discordSelected, setDiscordSelected] = useState<string>('');

  function handleBack() {
    navigation.navigate('home');
  }

  async function getDiscordUser(adId: string) {
    fetch(`http://192.168.1.15:3333/ads/${adId}/discord`).then((response) => response.json()).then((data) => setDiscordSelected(data.discord));
  }

  useEffect(() => {
    fetch(`http://192.168.1.15:3333/games/${game.id}/ads`).then((response) => response.json()).then((data) => setAds(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.rigth} />
        </View>

        <Image
          source={{ uri: game.imageUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          style={styles.containerList}
          contentContainerStyle={styles.contentList}
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          ListEmptyComponent={() => (
            <Text style={styles.emptyList}>Não há anúncios publicados ainda.</Text>
          )}
        />

        <DuoMatch
          discord={discordSelected}
          visible={discordSelected.length !== 0}
          onClose={() => setDiscordSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}
