import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertHourToMinutes } from './utils/convert_hour_to_minutes';
import { convertMinutesToHour } from './utils/convert_minutes_to_hour';

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3333);

const prisma = new PrismaClient();

app.get('/games', async (_request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    },
    orderBy: {
      title: 'asc'
    }
  });

  response.json(games);
});

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
      useVoiceChannel: true,
      createdAt: true,
    },
    where: {
      gameId: gameId
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  response.json(ads.map((ad) => ({
    ...ad,
    weekDays: ad.weekDays.split(','),
    hourStart: convertMinutesToHour(ad.hourStart),
    hourEnd: convertMinutesToHour(ad.hourEnd)
  })));
});

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const adParams = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      ...adParams,
      weekDays: adParams.weekDays.join(','),
      hourStart: convertHourToMinutes(adParams.hourStart),
      hourEnd: convertHourToMinutes(adParams.hourEnd)
    }
  });

  response.status(201).json(ad);
});

app.get('/ads/:id', async (request, response) => {
  const adId = request.params.id
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      id: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
      useVoiceChannel: true,
      createdAt: true,
    },
    where: {
      id: adId
    }
  });

  response.json(ad);
});

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  });

  response.json(ad);
});
