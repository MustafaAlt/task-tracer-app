<h1>Task Tracer: Tam Yığın (Full-Stack) Görev Takip Uygulaması</h1>

<p>Bu proje, bir görev takip uygulamasıdır. Backend için Spring Boot, frontend için React ve veritabanı olarak Docker üzerinde çalışan PostgreSQL kullanılarak geliştirilmiştir.

Uygulama, temel görev yönetimi ve kullanıcı tabanlı yetkilendirme özelliklerini sunar.</p>

---

<h2>Temel Özellikler</h2>

* **Kullanıcı Yönetimi:** Kullanıcılar kayıt olabilir ve sisteme giriş yapabilir.
<img width="1918" height="877" alt="{6449CD76-8D96-439F-8A76-310C811AA6A5}" src="https://github.com/user-attachments/assets/cffc51c5-20d5-43fb-b31a-3fb2aa0c0543" />

* **Rol Tabanlı Yetkilendirme (RBAC):** Kullanıcılara `USER` veya `ADMIN` rolleri atanabilir.
<img width="569" height="481" alt="{171387B9-974A-4081-B816-AA4AC485A4AA}" src="https://github.com/user-attachments/assets/bc97462c-ab4a-4bc8-97a5-1a4ad4cd6a91" />

* **Görev Yönetimi:**
    * Yeni görevler eklenebilir.
    * Mevcut görevler güncellenebilir ve silinebilir.
      <img width="419" height="422" alt="{515FCA59-3506-4298-AA0F-E5E39332A3C1}" src="https://github.com/user-attachments/assets/66c1112d-4a13-4b23-80d5-bad5e0cdc909" />
      <img width="408" height="405" alt="{28E7721A-A67A-41EE-ACD1-27302E7C6854}" src="https://github.com/user-attachments/assets/69e5c03b-f298-484a-835b-3499333d0aa5" />



* **Kişiselleştirilmiş Görev Listesi:** Giriş yapan kullanıcı, sadece kendisine atanan görevleri görüntüleyebilir.
  <img width="393" height="269" alt="{330FEC70-A736-4495-A334-156499E98AD0}" src="https://github.com/user-attachments/assets/99166784-8d57-477f-913f-65b49d6feda9" />

* **Görev Atama:** `ADMIN` rolüne sahip kullanıcılar, görevleri sisteme kayıtlı diğer kullanıcılara atayabilir.
<img width="559" height="502" alt="{40FA6188-8F07-4997-AD52-7DEAE3479051}" src="https://github.com/user-attachments/assets/b95693c7-09e5-4d1c-a51a-aea90177c3c0" />


---

<h2>### Kullanılan Teknolojiler</h2>

**Backend (Spring Boot):**
* **Framework:** Spring Boot 3
* **Veritabanı:** PostgreSQL
* **Veri Katmanı:** Spring Data JPA & Hibernate
* **Bağımlılık Yönetimi:** Maven
* **Yardımcı Kütüphane:** Lombok

**Frontend (React):**
* **Framework:** React.js
* **API İletişimi:** Axios
* **Geliştirme Ortamı:** npm

**Altyapı:**
* **Konteynerleştirme:** Docker (PostgreSQL için)

---

<h3>Kurulum ve Çalıştırma</h3>



```bash
Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

1. Veritabanını Başlatma (Docker)

Projenin ana dizininde bir terminal açın ve Docker üzerinde PostgreSQL veritabanını başlatın:
docker-compose up -d

2. Backend'i Başlatma (Spring Boot)
IntelliJ IDEA'yı açın ve task-tracer-backend projesini çalıştırın. Uygulama varsayılan olarak http://localhost:8080 adresinde başlayacaktır.

3. Frontend'i Başlatma (React)
VS Code'u açın, task-tracer-frontend klasörüne gidin ve terminalde şu komutu çalıştırın:

npm start
Uygulama varsayılan olarak http://localhost:3000 adresinde başlayacaktır.

Bash





