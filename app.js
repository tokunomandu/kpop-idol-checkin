const places = [
  {
    id: 1,
    name: 'Moonlight Café',
    city: 'Seoul',
    idol: 'BTS',
    category: '咖啡廳',
    distance: '8 min',
    rating: 4.8,
    checkins: 1284,
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80',
    description:
      '明亮木質感空間，適合午後小坐與拍照。粉絲常在窗邊打卡，享受安靜放鬆的城市氛圍。',
    address: 'Seoul, Mapo-gu · 23 Yeonnam-ro 3-gil',
    featured: true
  },
  {
    id: 2,
    name: 'Horizon Garden',
    city: 'Seoul',
    idol: 'Blackpink',
    category: '景觀餐廳',
    distance: '12 min',
    rating: 4.9,
    checkins: 1750,
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80',
    description:
      '高樓天台景色與都市夜景相映，適合拍攝浪漫氛圍。光線與裝潢都很適合 IG 風格打卡。',
    address: 'Seoul, Yongsan-gu · 7-1 Sungsan-ro',
    featured: true
  },
  {
    id: 3,
    name: 'Velvet Lane',
    city: 'Busan',
    idol: 'Stray Kids',
    category: '文青餐廳',
    distance: '15 min',
    rating: 4.7,
    checkins: 930,
    image:
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80',
    description:
      '重工風與復古元素混搭，暗色調裝潢是熱門拍照地。常見粉絲聚集聊天與打卡。',
    address: 'Busan, Haeundae-gu · 44 Marine City 2-ro',
    featured: true
  },
  {
    id: 4,
    name: 'Cherry Pop',
    city: 'Seoul',
    idol: 'NewJeans',
    category: '甜品店',
    distance: '6 min',
    rating: 4.9,
    checkins: 2050,
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
    description:
      '粉紅與奶茶色的裝潢搭配可愛甜點，適合陪伴下午茶打卡。整體風格輕盈、治癒。',
    address: 'Seoul, Seongsu · 18 Janghan-ro',
    featured: false
  },
  {
    id: 5,
    name: 'Echo Studio',
    city: 'Seoul',
    idol: 'SEVENTEEN',
    category: '音樂酒吧',
    distance: '10 min',
    rating: 4.6,
    checkins: 780,
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    description:
      '柔和燈光與音樂氛圍很受年輕人喜愛，熱鬧卻不失安靜。特別適合深夜散步後的休息。',
    address: 'Seoul, Itaewon · 17 Hannam-daero',
    featured: false
  },
  {
    id: 6,
    name: 'Nova Rooftop',
    city: 'Incheon',
    idol: 'aespa',
    category: '觀景點',
    distance: '18 min',
    rating: 4.8,
    checkins: 1660,
    image:
      'https://images.unsplash.com/photo-1517857845987-4950f4d08b70?auto=format&fit=crop&w=1000&q=80',
    description:
      '俯瞰海港與城市天際線，適合夜晚拍攝，也有很強的「旅行紀錄感」。',
    address: 'Incheon, Songdo · 12 Songdo Central-ro',
    featured: false
  }
];

const idolOptions = ['全部', 'BTS', 'Blackpink', 'Stray Kids', 'NewJeans', 'SEVENTEEN', 'aespa'];
const cityOptions = ['Seoul', 'Busan', 'Incheon'];

const state = {
  selectedIdol: '全部',
  searchText: '',
  saved: new Set([1]),
  checkedIn: new Set([2]),
  selectedPlace: null
};

const placeGrid = document.getElementById('placeGrid');
const idolFilters = document.getElementById('idolFilters');
const cityRow = document.getElementById('cityRow');
const searchInput = document.getElementById('searchInput');
const placeModal = document.getElementById('placeModal');

function renderFilters() {
  idolFilters.innerHTML = '';
  idolOptions.forEach((idol) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `filter-pill ${state.selectedIdol === idol ? 'active' : ''}`;
    button.textContent = idol;
    button.addEventListener('click', () => {
      state.selectedIdol = idol;
      render();
    });
    idolFilters.appendChild(button);
  });
}

function renderCities() {
  cityRow.innerHTML = '';
  cityOptions.forEach((city) => {
    const count = places.filter((place) => place.city === city).length;
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'city-card';
    card.innerHTML = `
      <div>
        <div class="city-name">${city}</div>
        <div class="city-count">${count} 個熱門地點</div>
      </div>
      <div class="city-badge">${city.slice(0, 1)}</div>
    `;
    card.addEventListener('click', () => {
      state.searchText = city;
      searchInput.value = city;
      render();
    });
    cityRow.appendChild(card);
  });
}

function getVisiblePlaces() {
  return places.filter((place) => {
    const idolMatch = state.selectedIdol === '全部' || place.idol === state.selectedIdol;
    const searchMatch =
      !state.searchText ||
      [place.name, place.city, place.category, place.idol].some((value) =>
        value.toLowerCase().includes(state.searchText.toLowerCase())
      );
    return idolMatch && searchMatch;
  });
}

function openPlaceModal(placeId) {
  const place = places.find((item) => item.id === placeId);
  if (!place) return;

  state.selectedPlace = place;
  const modal = document.getElementById('placeModal');
  document.getElementById('modalImage').src = place.image;
  document.getElementById('modalTitle').textContent = place.name;
  document.getElementById('modalCategory').textContent = place.category;
  document.getElementById('modalMeta').textContent = `${place.city} · ${place.address}`;
  document.getElementById('modalDescription').textContent = place.description;
  document.getElementById('modalCheckins').textContent = place.checkins.toLocaleString();
  document.getElementById('modalRating').textContent = place.rating.toFixed(1);
  document.getElementById('modalDistance').textContent = place.distance;

  const saveBtn = document.getElementById('modalSaveBtn');
  saveBtn.textContent = state.saved.has(place.id) ? '✓ 已收藏' : '♡ 收藏';
  saveBtn.style.background = state.saved.has(place.id)
    ? 'rgba(52,195,143,0.12)'
    : 'rgba(255, 76, 159, 0.08)';
  saveBtn.style.color = state.saved.has(place.id) ? '#167a58' : 'var(--pink-strong)';

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function closePlaceModal() {
  const modal = document.getElementById('placeModal');
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

function renderPlaces() {
  const visiblePlaces = getVisiblePlaces();

  if (!visiblePlaces.length) {
    placeGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; padding: 42px 18px; background: rgba(255,255,255,0.68); border: 1px solid var(--border); border-radius: 20px; text-align:center;">
        <h3 style="margin:0 0 8px; font-size:2rem; letter-spacing:-0.05em;">沒有符合條件的地點</h3>
        <p style="margin:0; color: var(--muted);">試試看其他愛豆或城市，會有更多打卡地點喔。</p>
      </div>
    `;
    return;
  }

  placeGrid.innerHTML = visiblePlaces
    .map(
      (place) => `
        <article class="place-card">
          <div class="place-card-media">
            <img src="${place.image}" alt="${place.name}" />
            <div class="card-badge" style="position:absolute; top: 12px; left: 12px;">${place.city}</div>
          </div>
          <div class="place-card-body">
            <div class="place-card-topline">
              <span class="tag" style="background: rgba(124,77,255,0.08); border-color: rgba(124,77,255,0.12); color: var(--purple);">${place.idol}</span>
              <button class="mini-love" data-save-id="${place.id}" aria-label="Save ${place.name}">${state.saved.has(place.id) ? '♥' : '♡'}</button>
            </div>
            <h3>${place.name}</h3>
            <div class="meta-row">
              <span>${place.category}</span>
              <span>•</span>
              <span>${place.distance}</span>
            </div>
            <div class="place-card-footer">
              <span class="score-pill">★ ${place.rating.toFixed(1)}</span>
              <div class="actions-row">
                <button class="card-btn secondary" data-open-id="${place.id}">詳情</button>
                <button class="card-btn" data-checkin-id="${place.id}">${state.checkedIn.has(place.id) ? '已打卡' : '打卡'}</button>
              </div>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('[data-open-id]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const id = Number(event.currentTarget.dataset.openId);
      openPlaceModal(id);
    });
  });

  document.querySelectorAll('[data-checkin-id]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const id = Number(event.currentTarget.dataset.checkinId);
      state.checkedIn.add(id);
      render();
    });
  });

  document.querySelectorAll('[data-save-id]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const id = Number(event.currentTarget.dataset.saveId);
      if (state.saved.has(id)) {
        state.saved.delete(id);
      } else {
        state.saved.add(id);
      }
      render();
    });
  });
}

function bindModalActions() {
  document.getElementById('modalSaveBtn').addEventListener('click', () => {
    if (!state.selectedPlace) return;
    if (state.saved.has(state.selectedPlace.id)) {
      state.saved.delete(state.selectedPlace.id);
    } else {
      state.saved.add(state.selectedPlace.id);
    }
    render();
    openPlaceModal(state.selectedPlace.id);
  });

  document.getElementById('checkInBtn').addEventListener('click', () => {
    if (!state.selectedPlace) return;
    state.checkedIn.add(state.selectedPlace.id);
    render();
    openPlaceModal(state.selectedPlace.id);
  });

  document.querySelectorAll('[data-close-modal="true"]').forEach((element) => {
    element.addEventListener('click', closePlaceModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePlaceModal();
    }
  });
}

function render() {
  renderFilters();
  renderCities();
  renderPlaces();
}

searchInput.addEventListener('input', (event) => {
  state.searchText = event.target.value;
  render();
});

document.querySelector('[data-cta="discover"]').addEventListener('click', () => {
  document.getElementById('discover').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

bindModalActions();
render();













































