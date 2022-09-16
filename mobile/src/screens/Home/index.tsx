import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';
import { GameParams } from '../../@types/navigation';

export function Home() {
  const [games, setGames] = useState<Array<GameCardProps>>([]);
  const navigation = useNavigation();

  function handleOpenGame(game: GameParams) {
    navigation.navigate('game', game);
  }

  useEffect(() => {
    fetch('http://192.168.1.15:3333/games').then((response) => response.json()).then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..." />

        <FlatList
          contentContainerStyle={styles.contentList}
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </SafeAreaView>
    </Background>
  );
}
