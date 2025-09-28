<h1>Proje Yapısı</h1>
<img width="435" height="218" alt="image" src="https://github.com/user-attachments/assets/193b8929-6f19-4099-ba0d-d24d963c0ca0" />

Backend katmanı, MVC (Model-View-Controller) mimarisine benzer bir yapı ile tasarlanmıştır. Bu yapı, her bir katmanın kendine özgü bir sorumluluğu olmasını sağlayarak kodun daha yönetilebilir ve anlaşılır olmasını sağlar.

controller: Uygulamanın API uç noktalarını (endpoints) yöneten katmandır. Frontend'den gelen HTTP isteklerini alır, servis katmanındaki ilgili metotları çağırır ve sonuçları HTTP yanıtı olarak frontend'e döndürür.

dto: Data Transfer Object (Veri Transfer Nesnesi) katmanıdır. Uygulamanın katmanları arasında ve API istekleri/yanıtları sırasında veri taşımak için kullanılır. Hassas bilgileri (örneğin, şifre) gizleyerek güvenliği artırır.

model: Veritabanındaki tabloları temsil eden varlık sınıflarını (entities) içerir. Bu sınıflar, verinin yapısını ve veritabanı ile olan ilişkilerini tanımlar.

repository: Veri erişim katmanıdır. Spring Data JPA sayesinde, veritabanına doğrudan SQL sorguları yazmak yerine, veri ekleme, okuma, güncelleme ve silme gibi işlemleri basit metotlar aracılığıyla gerçekleştirir.

service: İş mantığının (business logic) bulunduğu katmandır. Controller katmanından gelen istekleri işler, repository metotlarını çağırır ve uygulamanın temel kurallarını uygular.

Bu kısımların genel mantığını anladıktan sonra dosya içerikleri tam olarak ne yapıyor bunu anlatacağım. 

<h2>Model Katmanı </h2>
<img width="390" height="149" alt="{E2C61891-6B0A-470A-9656-85AC35070C79}" src="https://github.com/user-attachments/assets/edb092b7-6792-4074-9fa4-c385f178a24d" />


Dosya Yapısı Açıklaması
Role (Enum): Bu dosya, uygulamadaki kullanıcı rollerini (örneğin, ADMIN ve USER) tanımlayan bir enum'dır. Bu, kullanıcıların yetki seviyelerini belirlemek ve yönetmek için kullanılır.

TaskStatus (Enum): Bu dosya, bir görevin sahip olabileceği olası durumları (TODO, DONE gibi) tanımlar. Bu da, görevlerin yaşam döngüsünü yönetmek için önemlidir.

Task (Class): Bu sınıf, uygulamanın ana veri modelidir. Bir görevin neye benzediğini (başlık, açıklama, durumu gibi) ve hangi kullanıcıya atandığını tanımlar.
<h3>Task Sınıfı </h3>

@Entity ve @Table gibi anotasyonlarla veritabanında bir tabloya eşlenir.

User (Class): Bu sınıf, uygulamanın kullanıcı veri modelidir. Kullanıcının özelliklerini (kullanıcı adı, şifre, rolü gibi) tanımlar. Aynı Task sınıfı gibi, bu da veritabanında bir tabloya eşlenir.

Kısacası, bu model paketi, projenin veritabanı ile doğrudan iletişim kuran ve uygulamanın tüm veri yapısını belirleyen kalbidir.

@Entity: Bu anotasyon, Task sınıfının bir JPA varlığı (entity) olduğunu belirtir. Bu sayede Hibernate gibi ORM (Object-Relational Mapping) araçları bu sınıfı veritabanı tablolarıyla eşleyebilir.

@Table(name="task"): Sınıfın, veritabanındaki task adındaki tabloya karşılık geldiğini belirtir.

@Getter, @Setter, @NoArgsConstructor, @AllArgsConstructor: Bunlar Lombok kütüphanesinin anotasyonlarıdır. Otomatik olarak sınıf için getter, setter, boş ve dolu kurucular (constructor) oluşturarak gereksiz kod kalabalığını ortadan kaldırır.

Alanların Detayları
@Id, @GeneratedValue(strategy = GenerationType.IDENTITY): id alanını birincil anahtar (primary key) olarak tanımlar. IDENTITY stratejisi, veritabanının yeni kayıtlar için otomatik olarak benzersiz bir ID oluşturacağını belirtir.

@Column(name = "title", nullable = false): Görevin başlığını temsil eder. nullable = false özelliği, bu alanın veritabanında boş bırakılamayacağını garanti eder.

@Enumerated(EnumType.STRING): status alanı bir enum'dur (TaskStatus). @Enumerated anotasyonu, veritabanında bu enum değerinin string (yazı) olarak saklanacağını söyler (TODO, DONE gibi).

@ManyToOne: Bu en önemli kısımlardan biri. Bir görevin (Task), bir kullanıcıya (User) atandığını belirtir. ManyToOne, "birçok görev bir kullanıcıya ait olabilir" ilişkisini kurar.

@JoinColumn(name = "user_id"): Bu anotasyon, task tablosundaki user_id adında bir yabancı anahtar (foreign key) sütununun, User tablosundaki birincil anahtara bağlandığını gösterir.
<h3>User Sınıfı </h3>

User sınıfı ile task sınıfı mantık olarak aynıdır aslında task sınıfını anladıysak burası da aynı şekilde düşünebiliriz.















<h2> Controller Katmanı </h2>
<img width="426" height="162" alt="image" src="https://github.com/user-attachments/assets/01c695e6-13f5-4c52-82cf-e8ba741e9037" />
IUserController ve ITaskController: Bunlar birer arayüz (interface)'dür. Arayüzler, API'nin bir nevi sözleşmesini veya planını tanımlar. Hangi uç noktaların (@GetMapping, @PostMapping gibi) ve bu uç noktaların hangi metotlarla çalışacağını belirtirler.

UserControllerImpl ve TaskControllerImpl (Impl'li dosyalar): Bunlar ise arayüzleri uygulayan (implementation) sınıflardır. Yani, IUserController ve ITaskController arayüzlerinde tanımlanan metotların içini dolduran ve gerçek işlevselliği sağlayan sınıflardır. Burada @RestController ve @RequestMapping gibi anotasyonlarla HTTP isteklerini yöneten asıl kodlar bulunur.

Bu ayrım, API'nin tanımını (arayüzler) uygulamasından (Impl sınıflarından) ayırır. Böylece, API'nin nasıl çalıştığını değiştirmeden içindeki mantığı kolayca güncelleyebilirsin.

<h3>IUserController</h3>
@PostMapping("/register"): Bu kısım, /register URL'sine gelen HTTP POST isteklerini dinleyeceğini belirtiyor. POST, genellikle bir sunucuya veri göndermek için kullanılır, tıpkı yeni bir kullanıcı kaydederken olduğu gibi.

public User registerUser(@RequestBody User user): Bu metot, kayıt işlemini yapar. @RequestBody anotasyonu, isteğin gövdesinde (body) bir User objesi beklediğini ve bu objeyi otomatik olarak alacağını söylüyor.

@PostMapping("/login"): Bu da /login URL'sine gelen bir POST isteğini dinler.

public User login(@RequestParam String username, @RequestParam String password): Bu metot ise giriş işlemini yönetir. @RequestParam anotasyonları, isteğin URL'sinde ayrı ayrı username ve password değerlerini beklediğini belirtir.

<h3>ITaskController</h3>

API Sözleşmesi
Bu arayüzde, temel CRUD (Oluşturma, Okuma, Güncelleme, Silme) operasyonlarının yanı sıra, daha önce eklediğimiz kişisel görevleri filtreleme işlevi de tanımlanmıştır.

@GetMapping(): Okuma (Read) işlemi için kullanılır. getAllTasks() metodu, /api/tasks URL'ine gelen bir GET isteğiyle tüm görevlerin listesini döndürür.

@GetMapping(path = "/{id}"): Belirli bir görevi ID'sine göre okumak için kullanılır. Metot, URL'deki {id} değişkenini (@PathVariable) kullanarak görevi bulur.

@PostMapping: Oluşturma (Create) işlemi için kullanılır. createTask() metodu, /api/tasks adresine gelen POST isteğiyle yeni bir görev oluşturur. @RequestBody anotasyonu, isteğin gövdesindeki JSON verisini otomatik olarak bir Task objesine dönüştürür.

@PutMapping(path = "/{id}"): Güncelleme (Update) işlemi için kullanılır. @PutMapping ile /api/tasks/{id} adresine gelen bir istek, URL'deki ID'ye sahip görevi, gövdedeki yeni Task verisiyle günceller.

@DeleteMapping(path = "/{id}"): Silme (Delete) işlemi için kullanılır. @DeleteMapping ile bir görevi ID'sine göre siler.

@GetMapping("/my-tasks/{username}"): Bu, daha önce eklediğimiz kişiselleştirilmiş okuma işlemidir. /my-tasks/ URL'sine gelen GET isteği, URL'deki kullanıcı adına (@PathVariable) göre o kullanıcıya atanan tüm görevleri döndürür.



<h3> UserController </h3>
@RestController: Bu anotasyon, sınıfın bir REST Controller olduğunu belirtir. Bu, Spring'in gelen web isteklerini bu sınıf aracılığıyla işleyeceği anlamına gelir.

@RequestMapping(path = "api/user"): Bu, bu sınıf içindeki tüm API uç noktalarının (/register, /login) api/user ön ekiyle başlayacağını söyler. Yani, API'nin tam yolu /api/user/register olacaktır.

@CrossOrigin(origins = "http://localhost:3000"): Bu anotasyon, tarayıcının güvenlik özelliği olan CORS hatasını önlemek için kullanılır. Uygulamanın http://localhost:3000 adresinden gelen isteklere izin verdiğini söyler.

@Autowired private IUserServices userService;: Bu, Spring'in IUserServices arayüzünün bir örneğini (UserServicesImpl sınıfını) otomatik olarak bu değişkene enjekte etmesini sağlar. Bu sayede, veritabanı işlemlerini yapmak için servis katmanındaki metotları kolayca çağırabilirsin.

@PostMapping("/register"): /api/user/register adresine gelen POST isteğini bu metot işler. @RequestBody anotasyonu, isteğin gövdesindeki JSON verisini alır ve User objesine dönüştürür. Sonrasında bu User objesini servis katmanındaki register metoduna gönderir.

@PostMapping("/login"): /api/user/login adresine gelen POST isteğini bu metot işler. @RequestParam anotasyonları, isteğin URL'sindeki parametreleri (username ve password) alır ve bunları servis katmanındaki login metoduna iletir.


<h3> TaskController </h3>

Bu sınıftaki her metot, bir HTTP isteğini belirli bir URL yolu ile eşleştirir.

@RestController: Bu sınıfın bir REST API'si olduğunu ve gelen web isteklerini işleyeceğini söyler.

@RequestMapping(path = "api/tasks"): Bu sınıfın içindeki tüm API uç noktalarının api/tasks ile başlayacağını belirtir.

@CrossOrigin(origins = "http://localhost:3000"): React uygulamanın çalıştığı http://localhost:3000 adresinden gelen isteklere izin vererek CORS (çapraz kaynak) hatalarını engeller.

@Autowired private ITaskService taskService;: Bu, uygulamanın iş mantığını içeren ITaskService sınıfını otomatik olarak bu kontrolcüye bağlar. Böylece veritabanı işlemlerini yapmak için taskService metotlarını çağırabilirsin.

Metotların Açıklaması
getAllTasks(): GET isteği ile /api/tasks adresine gelen tüm görevleri listeler.

getTaskById(): GET isteği ile /api/tasks/{id} adresine gelen, ID'si belirtilen tek bir görevi getirir.

createTask(): POST isteği ile /api/tasks adresine gelen JSON verisini alarak yeni bir görev oluşturur.

updateTask(): PUT isteği ile /api/tasks/{id} adresine gelen istekle belirtilen görevi günceller.

deleteTask(): DELETE isteği ile /api/tasks/{id} adresine gelen istekle belirtilen görevi siler.

getTasksByAssignee(): GET isteği ile /api/tasks/my-tasks/{username} adresine gelen istekle, belirli bir kullanıcıya atanmış tüm görevleri listeler.

Bu sınıf, frontend'in kullanıcıdan aldığı verileri nasıl işleyeceğini ve hangi sonucu geri döndüreceğini belirler. Kısacası, backend'in ana beyni gibidir.

<h2>Services Katmanı </h2>
<img width="398" height="154" alt="{C9C4F034-6D69-4311-BBC5-FA5DCEC7BE9A}" src="https://github.com/user-attachments/assets/2b2ba1e2-7f05-416c-90fa-466c19379f72" />
dosya yapının mantığını anladığımızı düşünerek direk içeriğine geçiyorum.Burada servis katmanı aslında bizim işlerimizi yaptığımız katman olarak görev yapıyor. 


<h3>USerServices</h3>
Kod Açıklaması
@Service: Bu anotasyon, sınıfın bir iş mantığı servisi olduğunu ve Spring konteyneri tarafından yönetilmesi gerektiğini belirtir.

@Autowired private UserRepository userRepository;: Bu satır, UserRepository arayüzünün bir örneğini otomatik olarak enjekte eder. Bu, veritabanına doğrudan erişim sağlamak için userRepository metotlarını kullanmana olanak tanır.

Metotların Detayları
register(User user): Bu metot, yeni bir kullanıcıyı kaydeder.

İlk olarak, userRepository.existsByUsername() metodunu kullanarak yeni kullanıcının adının veritabanında zaten olup olmadığını kontrol eder.

Eğer kullanıcı adı zaten varsa, bir RuntimeException fırlatarak işlemi durdurur ve hata mesajı döndürür.

Kullanıcı adı benzersizse, userRepository.save() metodunu kullanarak yeni kullanıcıyı veritabanına kaydeder ve kaydettiği kullanıcı nesnesini geri döndürür.

login(String username, String password): Bu metot, kullanıcı giriş işlemini gerçekleştirir.

userRepository.findByUsername() ile veritabanında kullanıcı adına göre bir kullanıcı bulmaya çalışır.

Eğer kullanıcı bulunamazsa, orElseThrow() ile bir RuntimeException fırlatır.

Kullanıcı bulunursa, girilen şifreyi (password) veritabanındaki şifreyle karşılaştırır.

Şifreler eşleşmiyorsa, bir RuntimeException fırlatır.

Şifre doğruysa, kullanıcı nesnesini geri döndürür.

<h3>TaskServices</h3>
Kod Açıklaması
@Service: Bu anotasyon, sınıfın bir iş servisi olduğunu ve Spring tarafından yönetileceğini belirtir.

@Autowired: Bu anotasyon, Spring'in TaskRepository ve UserRepository arayüzlerini otomatik olarak enjekte etmesini sağlar. Bu sayede veritabanı işlemlerini doğrudan yapabiliriz.

Metotların Detayları
getAllTasks(): Bu metot, veritabanındaki tüm görevleri getirir.

getTaskById(Long id): Belirli bir ID'ye sahip görevi bulur veya bulamazsa bir hata fırlatır.

createTask(Task task): Yeni bir görev oluşturur.

Frontend'den gelen görev atanan kişinin kullanıcı adını alır.

Bu kullanıcı adına sahip kişiyi veritabanında bulur.

Eğer kullanıcı bulunamazsa hata verir.

Bulunan kullanıcıyı görev nesnesine atar ve veritabanına kaydeder.

updateTask(Long id, Task updatedTask): Mevcut bir görevi günceller.

Önce görevi ID'sine göre bulur.

createTask metoduna benzer şekilde, atanan kişinin kullanıcı adını bulur ve görevi günceller.

Son olarak güncellenmiş görevi veritabanına kaydeder.

deleteTask(Long id): Belirli bir ID'ye sahip görevi siler.

getTasksByAssignee(String username): Belirli bir kullanıcıya atanan tüm görevleri listeler.

Verilen kullanıcı adına göre bir kullanıcı bulur.

TaskRepository'nin findByAssignee metodunu kullanarak sadece o kullanıcıya ait görevleri döndürür.

<h1>Repository Katmanı </h1>
<img width="343" height="106" alt="{FC320222-279B-42FE-9DD3-51FF1C57F4A5}" src="https://github.com/user-attachments/assets/701df317-5cec-4d52-91db-952d43776262" />
TaskRepository: Bu arayüz, Task varlığı (entity) için veritabanı işlemlerini tanımlar. Görevleri bulmak, kaydetmek veya silmek için kullanılan metotları içerir.

UserRepository: Benzer şekilde, bu arayüz de User varlığı için veritabanı işlemlerini tanımlar. Kullanıcıları bulmak, kaydetmek veya kontrol etmek gibi işlemler için kullanılır.


JpaRepository<Task, Long>: Bu arayüzden türemek, TaskRepository'ye temel CRUD (Create, Read, Update, Delete) operasyonlarını (örneğin save(), findById(), findAll(), delete()) hiç kod yazmadan kullanma yeteneği kazandırır. Task, üzerinde işlem yapılacak varlığı (entity), Long ise bu varlığın birincil anahtarının (id) veri tipini belirtir.

Kanka, bu kod TaskRepository arayüzünü tanımlıyor ve veri erişim katmanının (data access layer) nasıl çalıştığını gösteriyor.

Kod Açıklaması
Bu dosya, Spring Data JPA'nın en güçlü özelliklerinden biri olan otomatik sorgu oluşturma (automatic query creation) yeteneğini kullanıyor.

@Repository: Bu anotasyon, sınıfın bir veri erişim nesnesi (DAO) olduğunu ve Spring konteyneri tarafından yönetilmesi gerektiğini belirtir.

JpaRepository<Task, Long>: Bu arayüzden türemek, TaskRepository'ye temel CRUD (Create, Read, Update, Delete) operasyonlarını (örneğin save(), findById(), findAll(), delete()) hiç kod yazmadan kullanma yeteneği kazandırır. Task, üzerinde işlem yapılacak varlığı (entity), Long ise bu varlığın birincil anahtarının (id) veri tipini belirtir.

Metotların Detayları
List<Task> findByAssignee(User assignee);: Bu satır çok önemlidir. Spring Data JPA, metot ismini okuyarak otomatik olarak bir SQL sorgusu oluşturur. Metodun ismindeki findByAssignee, JPA'ya "veritabanındaki assignee (atanan kişi) alanına göre görevleri bul" talimatını verir. JPA, assignee olarak gönderilen User nesnesini kullanarak veritabanında sorguyu çalıştırır.


