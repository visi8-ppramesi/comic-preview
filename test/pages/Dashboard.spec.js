import { mount } from '@vue/test-utils'
import Dashboard from '../../src/pages/Dashboard.vue'
import options from '../utils/pluginInitializer.js'
import { useI18nStore } from '../../src/store/i18n.js'
import { nextTick } from 'vue'
// import { createTestingPinia } from '@pinia/testing'

test('Dashboard-en', async () => {
    const wrapper = mount(Dashboard, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('en')
    await nextTick()
    
    expect(wrapper.find('#banner').exists()).toBe(true)
    // expect(wrapper.find('#async-banner').exists()).toBe(true)
    expect(wrapper.find('#dashboard-welcome').text()).toBe('Welcome To Visi8 Webcomic')
    expect(wrapper.find('#dashboard-welcome-content').text()).toBe('On our website, you will find various comic titles made by diverse creators across Indonesia. Here, you could read comics as easy as scrolling through your favorite social media app. Discover a more dynamic reading experience with moving panels complete with voice overs and sounds. And don’t forget to see characters coming to life through Augmented Reality (AR). Tap on one of our titles below and find out!')
    expect(wrapper.find('img[alt="bg-img"]').exists()).toBe(true)
    expect(wrapper.find('#dashboard-titles').text()).toBe('Our Titles')
    expect(wrapper.find('#dashboard-titles-item1').text()).toBe('Kara Guardian of The Realms')
    expect(wrapper.find('#dashboard-desc-item1').text()).toBe('Follow the journey of Kara, as she navigates the meaning of the duties imposed to her, while unwittingly tapping her hidden potentials and finding her place among modern humans.')
    expect(wrapper.find('img[alt="titles1"]').exists()).toBe(true)
    expect(wrapper.find('#dashboard-titles-item2').text()).toBe('Changelings')
    expect(wrapper.find('#dashboard-desc-item2').text()).toBe('Throughout time, children have been chosen – seemingly at random intervals – a human child and a demon from the Hantu spirit plane. These children are destined to battle each other for the sake of mankind, with one seeking peace and the other wanting only to plunge the world into darkness and chaos. Changelings tell the story of a demon named Arga who must match wits and strength against Durjana – a human raised by spirits in a dark and desolate world.')
    expect(wrapper.find('img[alt="titles2"]').exists()).toBe(true)
    expect(wrapper.find('#dashboard-titles-item3').text()).toBe('Galeo of The Seawalkers')
    expect(wrapper.find('#dashboard-desc-item3').text()).toBe('Galeo is afraid to participate in the Ikiro Trials, a dangerous rite-of-passage that makes children of the seas into mighty seawalkers. In a freak accident which destroys the temple trials, Galeo cannot complete the trials, resulting in his family getting banished and his father missing. In their exile, Galeo’s younger sister, Adeleo runs away from home to chase sea-ghosts, which she believes can bring her to their father. Although scared, Galeo goes after Adeleo braving the open seas and dangerous sea-forests. Along his journey, Galeo is forced to face his pas-demons and overcome natural challenges identical to those of the Ikiro Trials.')
    expect(wrapper.find('img[alt="titles3"]').exists()).toBe(true)
    expect(wrapper.find('#dashboard-titles-item4').text()).toBe('Seventh Tiger')
    expect(wrapper.find('#dashboard-desc-item4').text()).toBe('When a powerful figure in the criminal underworld of Indonesia is found murdered in an almost ritualistic slaying, an investigation follows that leads to a mysterious group of immortals dating back more than a thousand years—The Seven Tigers. These people have carved out their own power centers throughout Asia and have held a peaceful truce for centuries. That truce is over.')
    expect(wrapper.find('img[alt="titles4"]').exists()).toBe(true)
    expect(wrapper.find('#dashboard-about').text()).toBe('About Us')
    expect(wrapper.find('img[alt="about1"]').exists()).toBe(true)
    expect(wrapper.find('img[alt="about2"]').exists()).toBe(true)
    expect(wrapper.find('#dashboard-about-content1').text()).toBe('This journey began several years ago when Raiyan Laksamana and Farid Siddik were working together to tell stories through animation and film. Along the way, they met comic book creator Kevin VanHook and after more than a year of looking at ways the three could collaborate, it was decided to start telling many of their original stories with comics, as well as in animated and live-action form. Thus creating Visi8 Entertainment.')
    expect(wrapper.find('#dashboard-about-content2').text()).toBe('Visi8 Entertainment aims to develop stories into various media such as animation, Augmented Reality (AR), Virtual Reality (VR), Extended Reality (XR), live-action films, and even games. By combining the latest technology with compelling stories, Visi 8 aspires to present locally created content on to the international stage.')
    expect(wrapper.find('#titles1').exists()).toBe(false)
    expect(wrapper.find('#titles2').exists()).toBe(false)
    expect(wrapper.find('#titles3').exists()).toBe(false)
    expect(wrapper.find('#dashboard-authors').exists()).toBe(false)
    // expect(wrapper.find('#dashboard-about-content').text()).toBe(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`)
})

test('Dashboard-id', async () => {
    const wrapper = mount(Dashboard, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('id')
    await nextTick()
    
    expect(wrapper.find('#banner').exists()).toBe(true)
    // expect(wrapper.find('#async-banner').exists()).toBe(true)
    expect(wrapper.find('#dashboard-welcome').text()).toBe('Selamat Datang di Visi8 Webcomic')
    expect(wrapper.find('#dashboard-welcome-content').text()).toBe('Didalam website kita ini, terdapat berbagai judul komik yang dibuat oleh kreator-kreator beragam dari seluruh Indonesia. Disini, kamu bisa membaca komik dengan mudah seperti bermain dengan media sosial favorit kamu. Temukan pengalaman membaca yang berbeda dengan panel yang bergerak serta dilengkapi dengan voice over dan suara, dan jangan lupa untuk melihat berbagai jenis karakter yang keluar dari komik dengan menggunakan AR. Pilih salah dari judul di bawah dan temukan!')
    expect(wrapper.find('img[alt="bg-img"]').exists()).toBe(true)
    expect(wrapper.find('#dashboard-titles').text()).toBe('Judul Komik')
    expect(wrapper.find('#dashboard-titles-item1').text()).toBe('Kara Guardian of The Realms')
    expect(wrapper.find('#dashboard-desc-item1').text()).toBe('Ikuti perjalanan kara, saat dia menjelajahi arti dari tugas yang dibebankan padanya, tanpa disadari menggunakan potensi tersembunyi yang dimilikinya dan menemukan tempatnya diantara manusia modern.')
    expect(wrapper.find('img[alt="titles1"]').exists()).toBe(true)
    expect(wrapper.find('#dashboard-titles-item2').text()).toBe('Changelings')
    expect(wrapper.find('#dashboard-desc-item2').text()).toBe('Sepanjang waktu, anak-anak telah dipilih – tampaknya secara acak – seorang anak manusia dan iblis dari alam roh Hantu. Anak-anak ini ditakdirkan untuk berperang satu sama lain demi umat manusia, dengan satu mencari perdamaian dan yang lain hanya ingin menjerumuskan dunia ke dalam kegelapan dan kekacauan. Changelings bercerita tentang iblis bernama Arga yang harus menandingi kecerdasan dan kekuatannya melawan Durjana – manusia yang dibesarkan oleh roh di dunia yang gelap dan sunyi.')
    expect(wrapper.find('img[alt="titles2"]').exists()).toBe(true)
    expect(wrapper.find('#dashboard-titles-item3').text()).toBe('Galeo of The Seawalkers')
    expect(wrapper.find('#dashboard-desc-item3').text()).toBe('Galeo takut untuk ikut berpartisipasi kedalam percobaan Ikiro, sebuah upacara peralihan yang berbahaya agar membuat anak-anak laut menjadi penjelajah laut yang hebat. Didalam kecelakaan aneh yang menghancurkan kuil percobaan, galeo tidak dapat menyelesaikan percobaan tersebut, yang mengakibatkan keluarganya dibuang dan ayahnya hilang. Didalam pengasingan mereka, adik perempuan galeo yang paling muda, Adeleo pergi dari rumah untuk mengejar hantu laut, yang dia percayai bisa membawa dia kepada kepada ayah mereka. Wakaupun takut, galeo mengejar Adeleo yang pergi ke laut lepas dan hutan berbahaya. Didalam perjalannya galeo dipaksa untuk menghadapi iblis dan berbagai tantangan yang sangat mirip dengan percobaan Ikiro.')
    expect(wrapper.find('img[alt="titles3"]').exists()).toBe(true)
    expect(wrapper.find('#dashboard-titles-item4').text()).toBe('Seventh Tiger')
    expect(wrapper.find('#dashboard-desc-item4').text()).toBe('Ketika sosok kuat di dunia kriminal Indonesia ditemukan terbunuh dalam pembunuhan ritualistik, sebuah penyelidikan yang mengikuti mengarah ke suatu kelompok misterius abadi yang berusia lebih dari seribu tahun - seven tigers. Orang-orang ini telah membangun kekuasaan mereka di seluruh Asia dan telah mengadakan genjatan senjata secara damai selama berabad-abad. namun gencatan senjata itu telah berakhir.')
    expect(wrapper.find('img[alt="titles4"]').exists()).toBe(true)
    expect(wrapper.find('#dashboard-about').text()).toBe('Tentang Kami')
    expect(wrapper.find('img[alt="about1"]').exists()).toBe(true)
    expect(wrapper.find('img[alt="about2"]').exists()).toBe(true)
    expect(wrapper.find('#dashboard-about-content1').text()).toBe('Perjalanan ini dimulai dari beberapa tahun yang lalu ketika Raiyan Laksamana dan Farrid Siddik sedang bekerja sama untuk memberikan sebuah cerita melalui animasi dan film. Selama perjalanan, mereka bertemu kreator buku komik yaitu Kevin Vanhook dan setelah setahun lebih memikirkan jalan agar bisa berkolaborasi bersama, akhirnya memutuskan untuk mulai menceritakan banyak cerita asli mereka dengan komik, serta dalam bentuk animasi maupun live-action. Sehingga terciptalah Visi8 Entertaiment.')
    expect(wrapper.find('#dashboard-about-content2').text()).toBe('Visi8 Entertaiment bertujuan untuk membuat sebuah cerita ke dalam berbagai jenis media diantaranya animasi, Augmented Reality (AR),  Virtual Reality (VR), Extended Reality (XR), film live-action, bahkan permainan. Dengan menggabungkan teknologi terbaru dengan cerita yang menarik, Visi 8 bercita-cita untuk menyajikan konten buatan lokal kedalam panggung internasional.')
    expect(wrapper.find('#titles1').exists()).toBe(false)
    expect(wrapper.find('#titles2').exists()).toBe(false)
    expect(wrapper.find('#titles3').exists()).toBe(false)
    expect(wrapper.find('#dashboard-authors').exists()).toBe(false)
    // expect(wrapper.find('#dashboard-about-content').text()).toBe(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`)
})