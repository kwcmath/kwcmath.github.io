// 全域變數
let currentUser = null;
let currentCategory = 'all';
let currentAdminCategory = 'all';
let currentPage = 1;
let currentAdminPage = 1;
let editingEbookId = null;
let editingCategoryIndex = null;
let currentAdminTab = 'books';
let currentSortOrder = 'default';
let currentAdminSortOrder = 'default';
let currentSearchQuery = '';
let currentAdminSearchQuery = '';

// 預設電子書資料 (新增 categories 和 isPublic 欄位)
const defaultEbooks = [
    {
        id: 1,
        title: '論語精選',
        author: '孔子',
        categories: ['教育'],
        cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop',
        description: '經典教育思想著作',
        url: 'https://example.com/lunyu.pdf',
        views: 0,
        isPublic: true
    },
    {
        id: 2,
        title: '寫作技巧入門',
        author: '張文華',
        categories: ['寫作', '教育'],
        cover: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=200&h=300&fit=crop',
        description: '提升寫作能力的實用指南',
        url: 'https://example.com/writing.pdf',
        views: 0,
        isPublic: true
    },
    {
        id: 3,
        title: 'JavaScript 完全手冊',
        author: '李開發',
        categories: ['科技', '教育'],
        cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=300&fit=crop',
        description: '前端開發必備指南',
        url: 'https://example.com/javascript.pdf',
        views: 0,
        isPublic: false
    },
    {
        id: 4,
        title: '親子教養智慧',
        author: '王媽媽',
        categories: ['親子', '教育'],
        cover: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=300&fit=crop',
        description: '現代家庭教育指南',
        url: 'https://example.com/parenting.pdf',
        views: 0,
        isPublic: true
    },
    {
        id: 5,
        title: '健康飲食指南',
        author: '陳營養師',
        categories: ['健康'],
        cover: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=200&h=300&fit=crop',
        description: '營養均衡的飲食建議',
        url: 'https://example.com/health.pdf',
        views: 0,
        isPublic: true
    },
    {
        id: 6,
        title: '藝術史概論',
        author: '林藝術家',
        categories: ['藝術', '教育'],
        cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=300&fit=crop',
        description: '西方藝術發展歷程',
        url: 'https://example.com/art.pdf',
        views: 0,
        isPublic: false
    },
    {
        id: 7,
        title: '永續發展目標指南',
        author: '聯合國編輯部',
        categories: ['SDGs', '教育'],
        cover: 'https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=200&h=300&fit=crop',
        description: '2030永續發展目標解析',
        url: 'https://example.com/sdgs.pdf',
        views: 0,
        isPublic: true
    },
    {
        id: 8,
        title: '創意寫作工坊',
        author: '徐作家',
        categories: ['寫作', '藝術'],
        cover: 'https://images.unsplash.com/photo-1471086569966-db3eebc25a59?w=200&h=300&fit=crop',
        description: '激發創意的寫作練習',
        url: 'https://example.com/creative-writing.pdf',
        views: 0,
        isPublic: false
    },
    {
        id: 9,
        title: 'Python 程式設計',
        author: '程式老師',
        categories: ['科技'],
        cover: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=200&h=300&fit=crop',
        description: 'Python 從基礎到進階',
        url: 'https://example.com/python.pdf',
        views: 0,
        isPublic: true
    },
    {
        id: 10,
        title: '兒童心理學',
        author: '心理學博士',
        categories: ['親子', '健康'],
        cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop',
        description: '了解兒童發展心理',
        url: 'https://example.com/child-psychology.pdf',
        views: 0,
        isPublic: false
    },
    {
        id: 11,
        title: '數學教學法',
        author: '數學老師',
        categories: ['教育', '科技'],
        cover: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=300&fit=crop',
        description: '有效的數學教學策略',
        url: 'https://example.com/math-teaching.pdf',
        views: 0,
        isPublic: true
    },
    {
        id: 12,
        title: '氣候變遷與行動',
        author: '環保專家',
        categories: ['SDGs', '健康'],
        cover: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=200&h=300&fit=crop',
        description: '應對氣候變遷的具體行動',
        url: 'https://example.com/climate-action.pdf',
        views: 0,
        isPublic: true
    }
];

// 預設分類資料
const defaultCategories = ['教育', '寫作', '科技', '親子', '健康', '藝術', 'SDGs'];

// Cookie 操作函數
function setCookie(name, value, days = 365) {
    try {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        const expiresString = expires.toUTCString();

        // 由於資料可能很大，我們需要分割成多個小 Cookie
        const jsonString = JSON.stringify(value);
        const maxCookieSize = 3000; // 安全的 Cookie 大小限制
        const chunks = [];

        for (let i = 0; i < jsonString.length; i += maxCookieSize) {
            chunks.push(jsonString.substring(i, i + maxCookieSize));
        }

        // 設定分塊數量
        document.cookie = `${name}_chunks=${chunks.length}; expires=${expiresString}; path=/`;

        // 設定每個分塊
        chunks.forEach((chunk, index) => {
            document.cookie = `${name}_${index}=${encodeURIComponent(chunk)}; expires=${expiresString}; path=/`;
        });

        console.log(`Cookie ${name} 已儲存，分成 ${chunks.length} 個分塊`);
        return true;
    } catch (error) {
        console.error('設定 Cookie 時發生錯誤:', error);
        return false;
    }
}

function getCookie(name) {
    try {
        // 取得分塊數量
        const chunksMatch = document.cookie.match(new RegExp(`${name}_chunks=([^;]+)`));
        if (!chunksMatch) {
            console.log(`Cookie ${name} 不存在`);
            return null;
        }

        const chunksCount = parseInt(chunksMatch[1]);
        console.log(`Cookie ${name} 有 ${chunksCount} 個分塊`);

        // 重組所有分塊
        let jsonString = '';
        for (let i = 0; i < chunksCount; i++) {
            const chunkMatch = document.cookie.match(new RegExp(`${name}_${i}=([^;]+)`));
            if (chunkMatch) {
                jsonString += decodeURIComponent(chunkMatch[1]);
            } else {
                console.error(`Cookie 分塊 ${name}_${i} 遺失`);
                return null;
            }
        }

        const result = JSON.parse(jsonString);
        console.log(`Cookie ${name} 載入成功`);
        return result;
    } catch (error) {
        console.error('讀取 Cookie 時發生錯誤:', error);
        return null;
    }
}

function deleteCookie(name) {
    try {
        // 取得分塊數量
        const chunksMatch = document.cookie.match(new RegExp(`${name}_chunks=([^;]+)`));
        if (chunksMatch) {
            const chunksCount = parseInt(chunksMatch[1]);

            // 刪除所有分塊
            for (let i = 0; i < chunksCount; i++) {
                document.cookie = `${name}_${i}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
            }
        }

        // 刪除分塊數量記錄
        document.cookie = `${name}_chunks=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        console.log(`Cookie ${name} 已刪除`);
    } catch (error) {
        console.error('刪除 Cookie 時發生錯誤:', error);
    }
}

// 遷移舊資料格式
function migrateOldData(data) {
    return data.map(book => {
        // 如果是舊格式 (category 欄位)，轉換為新格式 (categories 陣列)
        if (book.category && !book.categories) {
            return {
                ...book,
                categories: [book.category],
                isPublic: book.isPublic !== undefined ? book.isPublic : true
            };
        }
        // 確保有 isPublic 欄位
        if (book.isPublic === undefined) {
            book.isPublic = true;
        }
        return book;
    });
}

// 從 Cookie 載入資料
function loadFromCookie() {
    try {
        console.log('開始從 Cookie 載入資料...');

        const savedEbooks = getCookie('ebooksData');
        const savedCategories = getCookie('categoriesData');

        if (savedEbooks && Array.isArray(savedEbooks)) {
            ebooks = migrateOldData(savedEbooks);
            console.log('已載入電子書數量:', ebooks.length);
        } else {
            ebooks = JSON.parse(JSON.stringify(defaultEbooks));
            console.log('使用預設電子書資料');
        }

        if (savedCategories && Array.isArray(savedCategories)) {
            categories = savedCategories;
            console.log('已載入分類:', categories);
        } else {
            categories = [...defaultCategories];
            console.log('使用預設分類資料');
        }

        console.log('Cookie 資料載入完成');

    } catch (error) {
        console.error('載入 Cookie 資料時發生錯誤:', error);
        ebooks = JSON.parse(JSON.stringify(defaultEbooks));
        categories = [...defaultCategories];
    }
}

// 儲存資料到 Cookie
function saveToCookie() {
    try {
        console.log('開始儲存資料到 Cookie...');

        const ebooksSaved = setCookie('ebooksData', ebooks);
        const categoriesSaved = setCookie('categoriesData', categories);

        if (ebooksSaved && categoriesSaved) {
            console.log('✅ 資料已成功儲存到 Cookie');
            console.log('電子書數量:', ebooks.length);
            console.log('分類數量:', categories.length);
            console.log('分類內容:', categories);
        } else {
            console.error('❌ Cookie 儲存失敗');
            alert('資料儲存失敗，可能是資料過大或瀏覽器設定問題');
        }

    } catch (error) {
        console.error('儲存 Cookie 時發生錯誤:', error);
        alert('儲存資料失敗: ' + error.message);
    }
}

// 匯出資料為 JSON 檔案
function exportData() {
    try {
        const data = {
            ebooks: ebooks,
            categories: categories,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `電子書平台資料_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('資料已匯出為 JSON 檔案！');
    } catch (error) {
        console.error('匯出資料時發生錯誤:', error);
        alert('匯出失敗: ' + error.message);
    }
}

// 匯入 JSON 檔案
function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = JSON.parse(e.target.result);

                // 驗證資料格式
                if (data.ebooks && Array.isArray(data.ebooks) &&
                    data.categories && Array.isArray(data.categories)) {

                    if (confirm('確定要匯入資料嗎？這將覆蓋現有的所有資料！')) {
                        ebooks = migrateOldData(data.ebooks);
                        categories = data.categories;

                        // 嘗試儲存到瀏覽器（如果可以的話）
                        saveToCookie();

                        // 更新界面
                        updateCategoryCheckboxes();
                        updateCategoryButtons();

                        if (document.getElementById('adminSection').classList.contains('active')) {
                            showAdminTab(currentAdminTab);
                        } else {
                            displayEbooks();
                        }

                        alert(`匯入成功！\n電子書: ${ebooks.length} 本\n分類: ${categories.length} 個`);
                    }
                } else {
                    alert('檔案格式不正確！請選擇正確的 JSON 檔案。');
                }
            } catch (error) {
                console.error('匯入資料時發生錯誤:', error);
                alert('匯入失敗: ' + error.message);
            }
        };

        reader.readAsText(file, 'UTF-8');
    };

    input.click();
}

// 儲存資料（優先使用 Cookie，失敗則提醒匯出）
function saveData() {
    const cookieSuccess = saveToCookie();

    if (!cookieSuccess) {
        console.warn('Cookie 儲存失敗，建議使用匯出功能備份資料');
        // 可以在這裡加入提醒用戶匯出的邏輯
    }

    return cookieSuccess;
}

// 修改所有儲存調用
function saveToLocalStorage() {
    // 保持向後兼容性的函數名稱，但實際使用新的儲存邏輯
    return saveData();
}

// 初始化載入資料
loadFromCookie();

// 重置為預設資料的功能
function resetToDefault() {
    if (!currentUser || !currentUser.isAdmin) {
        alert('請先以管理員身份登入！');
        return;
    }
    if (confirm('確定要重置為預設資料嗎？這將清除所有自訂的電子書資料和分類！')) {
        // 先刪除舊的 Cookie
        deleteCookie('ebooksData');
        deleteCookie('categoriesData');

        // 重置資料
        ebooks = JSON.parse(JSON.stringify(defaultEbooks)); // 深拷貝
        categories = [...defaultCategories];

        // 儲存新資料
        saveToCookie();

        updateCategoryCheckboxes();
        updateCategoryButtons();
        if (document.getElementById('adminSection').classList.contains('active')) {
            showAdminTab(currentAdminTab);
        } else {
            displayEbooks();
        }
        alert('已重置為預設資料！');
    }
}

// 登入功能
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('請輸入帳號和密碼！');
        return;
    }

    if ((username === 'admin' && password === 'admin123') ||
        (username === 'user' && password === 'user123')) {
        currentUser = {
            username: username,
            isAdmin: username === 'admin'
        };

        document.getElementById('loginBtn').textContent = currentUser.isAdmin ? '管理員登入' : '登入';
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';

        if (currentUser.isAdmin) {
            document.getElementById('adminBtn').style.display = 'block';
            showSection('admin'); // 管理員直接跳轉到後台管理
        } else {
            showSection('home'); // 一般用戶跳轉到首頁
        }
        updateUserInfo();
        displayEbooks(); // 重新顯示電子書（因為權限可能改變）
    } else {
        alert('帳號或密碼錯誤！');
    }
}

// 登出功能
function logout() {
    currentUser = null;
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'none';
    document.getElementById('adminBtn').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    showSection('home'); // 登出後回到首頁
    displayEbooks(); // 重新顯示電子書（因為權限改變）
}

// 更新用戶資訊顯示
function updateUserInfo() {
    const userInfo = document.getElementById('userInfo');
    if (currentUser) {
        const userType = currentUser.isAdmin ? '管理員' : '會員';
        userInfo.textContent = `歡迎，${currentUser.username} (${userType})！`;
    } else {
        userInfo.textContent = '';
    }
}

// 切換頁面
function showSection(sectionName) {
    // 檢查是否要進入後台管理但未登入
    if (sectionName === 'admin' && (!currentUser || !currentUser.isAdmin)) {
        alert('請先以管理員身份登入！');
        showSection('login');
        return;
    }

    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(sectionName + 'Section').classList.add('active');

    if (sectionName === 'home') {
        displayEbooks();
    } else if (sectionName === 'admin') {
        showAdminTab(currentAdminTab);
    }
}

// 更新分類按鈕
function updateCategoryButtons() {
    // 更新前台分類按鈕
    const frontCategories = document.getElementById('categories');
    frontCategories.innerHTML = '<div class="category-btn active" onclick="selectCategory(\'all\')">全部</div>';
    categories.forEach(cat => {
        frontCategories.innerHTML += `<div class="category-btn" onclick="selectCategory('${cat}')">${cat}</div>`;
    });

    // 更新後台分類按鈕
    const adminCategories = document.getElementById('adminCategories');
    adminCategories.innerHTML = '<div class="category-btn active" onclick="selectAdminCategory(\'all\')">全部</div>';
    categories.forEach(cat => {
        adminCategories.innerHTML += `<div class="category-btn" onclick="selectAdminCategory('${cat}')">${cat}</div>`;
    });
}

// 更新分類勾選框
function updateCategoryCheckboxes() {
    const checkboxContainer = document.getElementById('categoryCheckboxes');
    checkboxContainer.innerHTML = '';

    categories.forEach(cat => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'category-checkbox';
        checkboxDiv.innerHTML = `
            <input type="checkbox" id="cat_${cat}" value="${cat}">
            <label for="cat_${cat}">${cat}</label>
        `;
        checkboxContainer.appendChild(checkboxDiv);
    });
}

// 排序函數
function sortEbooks(ebooksList, sortOrder) {
    const sortedList = [...ebooksList]; // 創建副本避免修改原陣列

    switch (sortOrder) {
        case 'views_desc':
            return sortedList.sort((a, b) => b.views - a.views);
        case 'views_asc':
            return sortedList.sort((a, b) => a.views - b.views);
        case 'title_asc':
            return sortedList.sort((a, b) => a.title.localeCompare(b.title, 'zh-TW'));
        case 'title_desc':
            return sortedList.sort((a, b) => b.title.localeCompare(a.title, 'zh-TW'));
        case 'author_asc':
            return sortedList.sort((a, b) => a.author.localeCompare(b.author, 'zh-TW'));
        case 'author_desc':
            return sortedList.sort((a, b) => b.author.localeCompare(a.author, 'zh-TW'));
        case 'id_asc':
            return sortedList.sort((a, b) => a.id - b.id);
        case 'id_desc':
            return sortedList.sort((a, b) => b.id - a.id);
        default:
            return sortedList; // 預設排序（原本的順序）
    }
}

// 改變前台排序順序
function changeSortOrder() {
    currentSortOrder = document.getElementById('sortOption').value;
    currentPage = 1; // 重置到第一頁
    displayEbooks();
}

// 搜尋功能
function searchEbooks(ebooksList, query) {
    if (!query || query.trim() === '') {
        return ebooksList;
    }

    const searchTerm = query.toLowerCase().trim();

    return ebooksList.filter(book => {
        // 搜尋書名
        const titleMatch = book.title.toLowerCase().includes(searchTerm);

        // 搜尋作者
        const authorMatch = book.author.toLowerCase().includes(searchTerm);

        // 搜尋分類
        const categoryMatch = book.categories && book.categories.some(cat =>
            cat.toLowerCase().includes(searchTerm)
        );

        // 搜尋描述
        const descriptionMatch = book.description &&
            book.description.toLowerCase().includes(searchTerm);

        return titleMatch || authorMatch || categoryMatch || descriptionMatch;
    });
}

// 高亮搜尋關鍵字
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        return text;
    }

    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\// 改變後台排序順序')})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

// 前台搜尋相關函數
function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

function handleSearchInput() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearchBtn');

    if (searchInput.value.trim() !== '') {
        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
        if (currentSearchQuery !== '') {
            clearSearch();
        }
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    currentSearchQuery = query;
    currentPage = 1; // 重置到第一頁

    displayEbooks();
    updateSearchStatus();
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    currentSearchQuery = '';
    currentPage = 1;

    displayEbooks();
    hideSearchStatus();
}

function updateSearchStatus() {
    const statusElement = document.getElementById('searchStatus');

    if (currentSearchQuery === '') {
        hideSearchStatus();
        return;
    }

    // 計算搜尋結果數量
    let filteredEbooks = ebooks;

    if (currentCategory !== 'all') {
        filteredEbooks = filteredEbooks.filter(book =>
            book.categories && book.categories.includes(currentCategory)
        );
    }

    const searchResults = searchEbooks(filteredEbooks, currentSearchQuery);

    statusElement.className = 'search-status show';

    if (searchResults.length === 0) {
        statusElement.className += ' no-results';
        statusElement.textContent = `找不到包含「${currentSearchQuery}」的電子書`;
    } else {
        statusElement.className += ' has-results';
        statusElement.textContent = `找到 ${searchResults.length} 本包含「${currentSearchQuery}」的電子書`;
    }
}

function hideSearchStatus() {
    const statusElement = document.getElementById('searchStatus');
    statusElement.className = 'search-status';
}

// 後台搜尋相關函數
function handleAdminSearchKeyPress(event) {
    if (event.key === 'Enter') {
        performAdminSearch();
    }
}

function handleAdminSearchInput() {
    const searchInput = document.getElementById('adminSearchInput');
    const clearBtn = document.getElementById('clearAdminSearchBtn');

    if (searchInput.value.trim() !== '') {
        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
        if (currentAdminSearchQuery !== '') {
            clearAdminSearch();
        }
    }
}

function performAdminSearch() {
    const searchInput = document.getElementById('adminSearchInput');
    const query = searchInput.value.trim();

    currentAdminSearchQuery = query;
    currentAdminPage = 1; // 重置到第一頁

    displayAdminEbooks();
    updateAdminSearchStatus();
}

function clearAdminSearch() {
    document.getElementById('adminSearchInput').value = '';
    document.getElementById('clearAdminSearchBtn').style.display = 'none';
    currentAdminSearchQuery = '';
    currentAdminPage = 1;

    displayAdminEbooks();
    hideAdminSearchStatus();
}

function updateAdminSearchStatus() {
    const statusElement = document.getElementById('adminSearchStatus');

    if (currentAdminSearchQuery === '') {
        hideAdminSearchStatus();
        return;
    }

    // 計算搜尋結果數量
    let filteredEbooks = ebooks;

    if (currentAdminCategory !== 'all') {
        filteredEbooks = filteredEbooks.filter(book =>
            book.categories && book.categories.includes(currentAdminCategory)
        );
    }

    const searchResults = searchEbooks(filteredEbooks, currentAdminSearchQuery);

    statusElement.className = 'search-status show';

    if (searchResults.length === 0) {
        statusElement.className += ' no-results';
        statusElement.textContent = `找不到包含「${currentAdminSearchQuery}」的電子書`;
    } else {
        statusElement.className += ' has-results';
        statusElement.textContent = `找到 ${searchResults.length} 本包含「${currentAdminSearchQuery}」的電子書`;
    }
}

function hideAdminSearchStatus() {
    const statusElement = document.getElementById('adminSearchStatus');
    statusElement.className = 'search-status';
}
function changeAdminSortOrder() {
    currentAdminSortOrder = document.getElementById('adminSortOption').value;
    currentAdminPage = 1; // 重置到第一頁
    displayAdminEbooks();
}
function showAdminTab(tabName) {
    currentAdminTab = tabName;

    // 更新按鈕狀態
    document.getElementById('booksTabBtn').className = tabName === 'books' ? 'btn btn-primary' : 'btn btn-secondary';
    document.getElementById('categoriesTabBtn').className = tabName === 'categories' ? 'btn btn-primary' : 'btn btn-secondary';

    // 顯示對應區域
    document.getElementById('booksAdminArea').style.display = tabName === 'books' ? 'block' : 'none';
    document.getElementById('categoriesAdminArea').style.display = tabName === 'categories' ? 'block' : 'none';

    if (tabName === 'books') {
        displayAdminEbooks();
    } else if (tabName === 'categories') {
        displayCategories();
    }
}

// 選擇分類（前台）
function selectCategory(category) {
    currentCategory = category;
    currentPage = 1;

    // 更新分類按鈕狀態
    document.querySelectorAll('#categories .category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    displayEbooks();
}

// 選擇分類（後台）
function selectAdminCategory(category) {
    currentAdminCategory = category;
    currentAdminPage = 1;

    // 更新分類按鈕狀態
    document.querySelectorAll('#adminCategories .category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    displayAdminEbooks();
}

// 顯示電子書（前台）
function displayEbooks() {
    let filteredEbooks = ebooks;

    // 先套用分類篩選
    if (currentCategory !== 'all') {
        filteredEbooks = filteredEbooks.filter(book =>
            book.categories && book.categories.includes(currentCategory)
        );
    }

    // 再套用搜尋篩選
    if (currentSearchQuery) {
        filteredEbooks = searchEbooks(filteredEbooks, currentSearchQuery);
    }

    // 最後套用排序
    const sortedEbooks = sortEbooks(filteredEbooks, currentSortOrder);

    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const pageEbooks = sortedEbooks.slice(startIndex, endIndex);

    const grid = document.getElementById('ebooksGrid');
    grid.innerHTML = '';

    pageEbooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'ebook-card';

        // 如果書籍需要登入且用戶未登入，添加特殊樣式
        if (!book.isPublic && !currentUser) {
            bookCard.classList.add('login-required');
        }

        bookCard.onclick = () => openEbook(book);

        // 顯示分類標籤（支援搜尋高亮）
        const categoryTags = book.categories ? book.categories.map(cat => {
            const highlightedCat = currentSearchQuery ?
                highlightSearchTerm(cat, currentSearchQuery) : cat;
            return `<span class="ebook-category-tag">${highlightedCat}</span>`;
        }).join('') : '';

        // 支援搜尋高亮的書名和作者
        const highlightedTitle = currentSearchQuery ?
            highlightSearchTerm(book.title, currentSearchQuery) : book.title;

        bookCard.innerHTML = `
            <div class="ebook-cover" style="background-image: url('${book.cover}')">
                ${!book.cover ? '📖' : ''}
            </div>
            <div class="ebook-title">${highlightedTitle}</div>
            <div class="ebook-categories">${categoryTags}</div>
            <div class="ebook-views">閱覽 ${book.views} 次</div>
        `;

        grid.appendChild(bookCard);
    });

    displayPagination(sortedEbooks.length, 10, 'pagination', (page) => {
        currentPage = page;
        displayEbooks();
    });

    // 更新搜尋狀態
    if (currentSearchQuery) {
        updateSearchStatus();
    }
}

// 顯示電子書（後台）
function displayAdminEbooks() {
    let filteredEbooks = ebooks;

    // 先套用分類篩選
    if (currentAdminCategory !== 'all') {
        filteredEbooks = filteredEbooks.filter(book =>
            book.categories && book.categories.includes(currentAdminCategory)
        );
    }

    // 再套用搜尋篩選
    if (currentAdminSearchQuery) {
        filteredEbooks = searchEbooks(filteredEbooks, currentAdminSearchQuery);
    }

    // 最後套用排序
    const sortedEbooks = sortEbooks(filteredEbooks, currentAdminSortOrder);

    const startIndex = (currentAdminPage - 1) * 20;
    const endIndex = startIndex + 20;
    const pageEbooks = sortedEbooks.slice(startIndex, endIndex);

    const tbody = document.getElementById('adminTableBody');
    tbody.innerHTML = '';

    pageEbooks.forEach(book => {
        const row = document.createElement('tr');

        // 顯示分類（支援搜尋高亮）
        const categoryText = book.categories ? book.categories.map(cat => {
            return currentAdminSearchQuery ?
                highlightSearchTerm(cat, currentAdminSearchQuery) : cat;
        }).join(', ') : '未分類';

        // 權限標籤
        const permissionBadge = book.isPublic
            ? '<span class="permission-badge permission-public">公開</span>'
            : '<span class="permission-badge permission-private">需登入</span>';

        // 支援搜尋高亮的書名和作者
        const highlightedTitle = currentAdminSearchQuery ?
            highlightSearchTerm(book.title, currentAdminSearchQuery) : book.title;
        const highlightedAuthor = currentAdminSearchQuery ?
            highlightSearchTerm(book.author, currentAdminSearchQuery) : book.author;

        row.innerHTML = `
            <td><img src="${book.cover || 'https://via.placeholder.com/50x60'}" alt="封面"></td>
            <td>${highlightedTitle}</td>
            <td>${highlightedAuthor}</td>
            <td>${categoryText}</td>
            <td>${permissionBadge}</td>
            <td><strong>${book.views}</strong></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editEbook(${book.id})">編輯</button>
                    <button class="btn-delete" onclick="deleteEbook(${book.id})">刪除</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    displayPagination(sortedEbooks.length, 20, 'adminPagination', (page) => {
        currentAdminPage = page;
        displayAdminEbooks();
    });

    // 更新搜尋狀態
    if (currentAdminSearchQuery) {
        updateAdminSearchStatus();
    }
}

// 顯示分頁控制
function displayPagination(totalItems, itemsPerPage, containerId, onPageClick) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('div');
        pageBtn.className = 'page-btn';
        pageBtn.textContent = i;
        pageBtn.onclick = () => {
            document.querySelectorAll(`#${containerId} .page-btn`).forEach(btn => {
                btn.classList.remove('active');
            });
            pageBtn.classList.add('active');
            onPageClick(i);
        };

        if (i === (containerId === 'pagination' ? currentPage : currentAdminPage)) {
            pageBtn.classList.add('active');
        }

        container.appendChild(pageBtn);
    }
}

// 開啟電子書
function openEbook(book) {
    // 檢查權限
    if (!book.isPublic && !currentUser) {
        document.getElementById('loginRequiredModal').style.display = 'block';
        return;
    }

    book.views++;
    saveToCookie(); // 儲存閱覽次數更新
    window.open(book.url, '_blank');

    if (document.getElementById('homeSection').classList.contains('active')) {
        displayEbooks();
    }
}

// 關閉登入提示彈窗
function closeLoginRequiredModal() {
    document.getElementById('loginRequiredModal').style.display = 'none';
}

// 顯示分類管理
function displayCategories() {
    const tbody = document.getElementById('categoriesTableBody');
    tbody.innerHTML = '';

    categories.forEach((cat, index) => {
        const bookCount = ebooks.filter(book =>
            book.categories && book.categories.includes(cat)
        ).length;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cat}</td>
            <td>${bookCount}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editCategory(${index})">編輯</button>
                    <button class="btn-delete" onclick="deleteCategory(${index})">刪除</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 顯示新增分類彈窗
function showAddCategoryModal() {
    if (!currentUser || !currentUser.isAdmin) {
        alert('請先以管理員身份登入！');
        return;
    }
    editingCategoryIndex = null;
    document.getElementById('categoryModalTitle').textContent = '新增分類';
    document.getElementById('categoryForm').reset();
    document.getElementById('categoryModal').style.display = 'block';
}

// 編輯分類
function editCategory(index) {
    if (!currentUser || !currentUser.isAdmin) {
        alert('請先以管理員身份登入！');
        return;
    }
    editingCategoryIndex = index;
    document.getElementById('categoryModalTitle').textContent = '編輯分類';
    document.getElementById('categoryName').value = categories[index];
    document.getElementById('categoryModal').style.display = 'block';
}

// 刪除分類
function deleteCategory(index) {
    if (!currentUser || !currentUser.isAdmin) {
        alert('請先以管理員身份登入！');
        return;
    }

    const categoryName = categories[index];
    const relatedBooks = ebooks.filter(book =>
        book.categories && book.categories.includes(categoryName)
    );

    if (relatedBooks.length > 0) {
        alert(`無法刪除分類「${categoryName}」，因為還有 ${relatedBooks.length} 本電子書屬於此分類。請先移除或更改這些電子書的分類。`);
        return;
    }

    if (confirm(`確定要刪除分類「${categoryName}」嗎？`)) {
        categories.splice(index, 1);
        saveToCookie();
        updateCategoryCheckboxes();
        updateCategoryButtons();
        displayCategories();
        alert('分類已刪除！');
    }
}

// 儲存分類
function saveCategory(event) {
    event.preventDefault();

    const categoryName = document.getElementById('categoryName').value.trim();

    if (!categoryName) {
        alert('請輸入分類名稱！');
        return;
    }

    // 檢查分類名稱是否重複
    if (editingCategoryIndex === null && categories.includes(categoryName)) {
        alert('分類名稱已存在！');
        return;
    }

    if (editingCategoryIndex !== null && categories.includes(categoryName) && categories[editingCategoryIndex] !== categoryName) {
        alert('分類名稱已存在！');
        return;
    }

    if (editingCategoryIndex !== null) {
        // 編輯現有分類
        const oldCategoryName = categories[editingCategoryIndex];
        categories[editingCategoryIndex] = categoryName;

        // 更新所有使用此分類的電子書
        ebooks.forEach(book => {
            if (book.categories && book.categories.includes(oldCategoryName)) {
                const index = book.categories.indexOf(oldCategoryName);
                book.categories[index] = categoryName;
            }
        });

        alert('分類已更新！');
    } else {
        // 新增分類
        categories.push(categoryName);
        alert('分類已新增！');
    }

    saveToCookie();
    updateCategoryCheckboxes();
    updateCategoryButtons();
    closeCategoryModal();
    displayCategories();
}

// 關閉分類彈窗
function closeCategoryModal() {
    document.getElementById('categoryModal').style.display = 'none';
}

// 顯示新增電子書彈窗
function showAddEbookModal() {
    if (!currentUser || !currentUser.isAdmin) {
        alert('請先以管理員身份登入！');
        return;
    }
    editingEbookId = null;
    document.getElementById('modalTitle').textContent = '新增電子書';
    document.getElementById('ebookForm').reset();
    document.getElementById('isPublic').checked = true;

    // 清除所有分類勾選
    document.querySelectorAll('#categoryCheckboxes input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    document.getElementById('ebookModal').style.display = 'block';
}

// 編輯電子書
function editEbook(id) {
    if (!currentUser || !currentUser.isAdmin) {
        alert('請先以管理員身份登入！');
        return;
    }
    const book = ebooks.find(b => b.id === id);
    if (!book) return;

    editingEbookId = id;
    document.getElementById('modalTitle').textContent = '編輯電子書';
    document.getElementById('ebookTitle').value = book.title;
    document.getElementById('ebookAuthor').value = book.author;
    document.getElementById('ebookCover').value = book.cover || '';
    document.getElementById('ebookDescription').value = book.description || '';
    document.getElementById('ebookUrl').value = book.url;
    document.getElementById('isPublic').checked = book.isPublic !== false;

    // 設定分類勾選狀態
    document.querySelectorAll('#categoryCheckboxes input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = book.categories && book.categories.includes(checkbox.value);
    });

    document.getElementById('ebookModal').style.display = 'block';
}

// 刪除電子書
function deleteEbook(id) {
    if (!currentUser || !currentUser.isAdmin) {
        alert('請先以管理員身份登入！');
        return;
    }
    if (confirm('確定要刪除這本電子書嗎？')) {
        ebooks = ebooks.filter(book => book.id !== id);
        saveToCookie();
        displayAdminEbooks();
        alert('電子書已刪除！');
    }
}

// 儲存電子書
function saveEbook(event) {
    event.preventDefault();

    const title = document.getElementById('ebookTitle').value;
    const author = document.getElementById('ebookAuthor').value;
    const cover = document.getElementById('ebookCover').value;
    const description = document.getElementById('ebookDescription').value;
    const url = document.getElementById('ebookUrl').value;
    const isPublic = document.getElementById('isPublic').checked;

    // 獲取選中的分類
    const selectedCategories = [];
    document.querySelectorAll('#categoryCheckboxes input[type="checkbox"]:checked').forEach(checkbox => {
        selectedCategories.push(checkbox.value);
    });

    if (selectedCategories.length === 0) {
        alert('請至少選擇一個分類！');
        return;
    }

    if (editingEbookId) {
        // 編輯現有電子書
        const book = ebooks.find(b => b.id === editingEbookId);
        if (book) {
            book.title = title;
            book.author = author;
            book.categories = selectedCategories;
            book.cover = cover;
            book.description = description;
            book.url = url;
            book.isPublic = isPublic;
        }
        alert('電子書已更新！');
    } else {
        // 新增電子書
        const newId = Math.max(...ebooks.map(b => b.id)) + 1;
        ebooks.push({
            id: newId,
            title: title,
            author: author,
            categories: selectedCategories,
            cover: cover,
            description: description,
            url: url,
            views: 0,
            isPublic: isPublic
        });
        alert('電子書已新增！');
    }

    saveToCookie();
    closeModal();
    displayAdminEbooks();
}

// 關閉彈窗
function closeModal() {
    document.getElementById('ebookModal').style.display = 'none';
}

// 點擊彈窗外部關閉
window.onclick = function (event) {
    const ebookModal = document.getElementById('ebookModal');
    const categoryModal = document.getElementById('categoryModal');
    const loginRequiredModal = document.getElementById('loginRequiredModal');

    if (event.target === ebookModal) {
        closeModal();
    }
    if (event.target === categoryModal) {
        closeCategoryModal();
    }
    if (event.target === loginRequiredModal) {
        closeLoginRequiredModal();
    }
}

// 支援 Enter 鍵登入
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('password').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            login();
        }
    });

    document.getElementById('username').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            login();
        }
    });

    // 初始化顯示
    updateUserInfo();
    updateCategoryButtons();
    updateCategoryCheckboxes();
    // 預設顯示首頁電子書
    displayEbooks();
});