# SHELL SCRIPT

## ARG

### ARG CHECK

```{.bash}
#!/bin/env sh
if [ $# -ne 2 ]; then
    echo usage: `basename ${0}` YYYY MO >&2
    exit 1
fi
ARG1=${1}
ARG2=${2}
```

## TIME

### UPTIME for SCRIPT(bash)

bash にはあらかじめ SECONDS ていう環境変数がある。

```{.bash}
#!/bin/env bash
SECONDS=0
sleep 3
echo $SECONDS
```


## QUOTEATION

```{.bash}
AAA=abc
echo "${AAA}" # 展開される
echo '${AAA}' # 展開されぬ
```

## FOR

### foreach

```{.bash}
for num in one two three; do
    echo ${num}
done
```

```{.bash}
nums="one two three"
for num in ${nums}; do
    echo ${num}
done
```


### range(1..10)

```{.bash}
for x in `seq 1 10`; do
    echo ${x}
done
```


## IF

### FILE NOT EXISTS

```{.bash}
if [ ! -e FILE ]; then
   echo 'file not found'
fi
```


# ELASTIC SEARCH

<form class="form-horizontal">

<div class="form-group">
<label class="control-label col-xs-6">SERVER ADDRESS & PORT</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="ES_SERVER_ADDRESS" ng-init="ES_SERVER_ADDRESS='192.168.0.246:9200'">
</div>
</div>

<div class="form-group">
<label class="control-label col-xs-6">INDEX NAME</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="ES_INDEX_NAME" ng-init="ES_INDEX_NAME='db-name'">
</div>
</div>


<div class="form-group">
<label class="control-label col-xs-6">TYPE NAME</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="ES_TYPE_NAME" ng-init="ES_TYPE_NAME='table-name'">
</div>
</div>

</form>

## INDEX

### create

``` {.bash}
curl -XPUT 'http://{{ES_SERVER_ADDRESS}}/{{ES_INDEX_NAME}}'
```

### look

``` {.bash}
curl -XGET 'http://{{ES_SERVER_ADDRESS}}/{{ES_INDEX_NAME}}?pretty=true'
```

### delete

``` {.bash}
curl -XDELETE 'http://{{ES_SERVER_ADDRESS}}/{{ES_INDEX_NAME}}'
```


## TYPE

### create

``` {.bash}
curl -XPUT 'http://{{ES_SERVER_ADDRESS}}/{{ES_INDEX_NAME}}/{{ES_TYPE_NAME}}/_mapping'  -d @{{ES_TYPE_NAME}}.json
```

#### {{ES_TYPE_NAME}}.json

``` {.json}
{
    "{{ES_TYPE_NAME}}":{
        "properties":{
            "@timestamp":{
                "type":"date"
                ,"format":"yyyy-MM-dd HH:mm:ss"
            }
            ,"srv"     :{"type":"string", "index": "not_analyzed"}
            ,"pid"     :{"type":"integer"}
            ,"user"    :{"type":"string", "index": "not_analyzed"}
            ,"pr"      :{"type":"string", "index": "not_analyzed"}
            ,"ni"      :{"type":"integer"}
            ,"virt"    :{"type":"integer"}
            ,"res"     :{"type":"integer"}
            ,"shr"     :{"type":"integer"}
            ,"s"       :{"type":"string", "index": "not_analyzed"}
            ,"cpu"     :{"type":"float"}
            ,"mem"     :{"type":"float"}
            ,"times"   :{"type":"string"}
            ,"cmd0"    :{"type":"string", "index": "not_analyzed"}
            ,"cmd"     :{"type":"string", "index": "not_analyzed"}
        }
    }
}
```

### look

``` {.bash}
curl -XGET 'http://{{ES_SERVER_ADDRESS}}/{{ES_INDEX_NAME}}/{{ES_TYPE_NAME}}/_mapping?pretty=true'
```

### delete

``` {.bash}
curl -XGET 'http://{{ES_SERVER_ADDRESS}}/{{ES_INDEX_NAME}}/{{ES_TYPE_NAME}}'
```


## BULK IMPORT

#### @IMPORTDATAFILE.json

``` {.json}
{"index":{}}
{"@timestamp":"2014-11-01 00:01:01","srv":"srv_A","pid":2884,"user":"oracle","pr":"15","ni":"0","virt":1589000,"res":496000,"shr":489000,"s":"S","cpu":15.4,"mem":10.0,"times":"0:03.45","cmd0":"oracle","cmd":"oracle (LOCAL=NO)"}
{"index":{}}
{"@timestamp":"2014-11-01 00:01:01","srv":"srv_A","pid":10680,"user":"oracle","pr":"16","ni":"0","virt":1603000,"res":1000000,"shr":1000000,"s":"S","cpu":3.9,"mem":27.4,"times":"400:19.45","cmd0":"ora_j000","cmd":"ora_j000"}
{"index":{}}
{"@timestamp":"2014-11-01 00:01:01","srv":"srv_A","pid":4645,"user":"root","pr":"15","ni":"0","virt":6276,"res":948,"shr":668,"s":"R","cpu":1.9,"mem":0.0,"times":"0:00.01","cmd0":"top","cmd":"top -b -n 1 -c"}
```

### NORMAL SIZE

``` {.bash}
curl -XPOST 'http://{{ES_SERVER_ADDRESS}}/{{ES_INDEX_NAME}}/{{ES_TYPE_NAME}}/_bulk' --data-binary @IMPORTDATAFILE.json  > /dev/null
```


### LAERGE SIZE

``` {.bash}
split IMPORTDATAFILE.json -l 100000
time for f in x??; do curl -XPOST 'http://{{ES_SERVER_ADDRESS}}/{{ES_INDEX_NAME}}/{{ES_TYPE_NAME}}/_bulk' --data-binary @$f > /dev/null; done
rm -f x??
```


## SEARCH

``` {.bash}
curl -XGET 'http://{{ES_SERVER_ADDRESS}}/{{ES_INDEX_NAME}}/{{ES_TYPE_NAME}}/_search'
```




# BZ2

### EXTRACT

``` {.bash}
tar jxvf FILE.tar.bz2
```


# NODE

## npm

### order PACKAGE

#### package.json

dependencies に追加していく

``` {.json}
{
  "name": "tw",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "ntwitter": "~0.5.0"
  }
}
```


### PACKAGE INSTALL

bundler と違ってデフォルトでローカル ./node_modules/ にダウンロードされる

``` {.bash}
npm install
```

# CASSANDRA

## CQLSH

### exec CQL file

``` {.bash}
cqlsh HOSTNAME -f FILENAME
```

### CLUSTER STATUS

``` {.bash}
nodetool status KEYSPACE
```



# TCPDUMP

``` {.bash}
tcpdump -Xs 256 -n -i eth1 dst port 50012
```



# SCHEME

## LIST

OPE            内容
------------- ----------------------------------
(car LIST)     リストの先頭要素を返す
(cdr LIST)     リストの先頭要素を除いた要素を返す



# CLOSURE

## What

関数そのものに値を保持する仕組み。これが無いと大域汚染を伴うクラスやグローバル変数を使うことになる。この大域汚染は、特に複数のサードパーティライブラリを組み合わせる際に問題となる。

なので、データセットのダーティフラグとかしょうもない用事には CLOSURE を使う。

### example:javascript

``` {.javascript}
#!/bin/env node

function outer(n) {
    var x = n;
    return function() {
        console.log(x);
        x = x + 1;
    };
}

var f1 = outer(1);
var f2 = outer(11);

f1();
f1();
console.log("---")
f2();
f2();
console.log("---")
f1();
f1();
```

``` {.bash}
$ node ./closure.js 
1
2
---
11
12
---
3
4
```



# PYTHON

## DATE & TIME

### what time now

``` {.python}
import datetime
datetime.datetime.today().strftime('%Y-%m-%d_%H-%M-%S')
```



# CRUD/SQL/REST

## BASICs

OPE   CRUD    SQL       REST      $http
----- -----   --------  --------- -------
追加  Create  insert    post      BODY
取得  Read    select    get       URI
更新  Update  update    put       BODY
削除  Delete  delete    delete    URI



# NKF

### 改行変換

#### from Win

``` {.bash}
nkf -Lu AAA.txt
```

# WGET

## FTP

### FTP GET

<form class="form-horizontal">

<div class="form-group">
<label class="control-label col-xs-6">SERVER NAME</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="WGET_FTP_SERVER" ng-init="WGET_FTP_SERVER='SERVER'">
</div>
</div>

<div class="form-group">
<label class="control-label col-xs-6">FTP USER</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="WGET_FTP_USER" ng-init="WGET_FTP_USER='user'">
</div>
</div>

<div class="form-group">
<label class="control-label col-xs-6">FTP PASSWORD</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="WGET_FTP_PASS" ng-init="WGET_FTP_PASS='passwd'">
</div>
</div>

<div class="form-group">
<label class="control-label col-xs-6">get FILE</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="WGET_GET_FILE" ng-init="WGET_GET_FILE='filename'">
</div>
</div>

</form>

``` {.bash}
wget --ftp-user={{WGET_FTP_USER}} --ftp-password={{WGET_FTP_PASS}} ftp://{{WGET_FTP_SERVER}}/{{WGET_GET_FILE}}
```


# SQLITE3

<form class="form-horizontal">

<div class="form-group">
<label class="control-label col-xs-6">DATABASE NAME</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="SQLITE_DB_NAME" ng-init="SQLITE_DB_NAME='./mnt'">
</div>
</div>

<div class="form-group">
<label class="control-label col-xs-6">TABLE NAME</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="SQLITE_TAB_NAME" ng-init="SQLITE_TAB_NAME='TAB'">
</div>
</div>

<div class="form-group">
<label class="control-label col-xs-6">SQL FILE NAME</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="SQLITE_SQL_FILE" ng-init="SQLITE_SQL_FILE='AAA.sql'">
</div>
</div>

</form>

## DATABASE

### create/connect DATABASE

``` {.bash}
sqlite3 {{SQLITE_DB_NAME}}.sqlite3
```

``` {.sql}
.databases
```

## TABLE


### CSV DATA IMPORT

``` {.sql}
.separator ,
.import FILE TAB
```


### LIST

``` {.sql}
.tables
```

``` {.sql}
select name from sqlite_master where type='table' order by name;
```

``` {.sql}
select '.import ./csv/' || name || '.csv ' || name from sqlite_master where type='table' order by name;
```


### SQL from FILE

``` {.sql}
.read {{SQLITE_SQL_FILE}}
```

``` {.sql}
sqlite3 {{SQLITE_DB_NAME}} < {{SQLITE_SQL_FILE}}
```





### CREATE

``` {.sql}
create table {{SQLITE_TAB_NAME}} (
    id integer not null primary key
  , name text
  , notype
  , ts timestamp default (datetime('now', 'localtaime'))
);
```

### DROP

``` {.sql}
create table {{SQLITE_TAB_NAME}};
```

### SOURCE

``` {.sql}
.schema {{SQLITE_TAB_NAME}}
```
 


# EMACS

### RECT

 key       move  
--------- ------------------
 C-x r k   矩形領域カット  
 C-x r y   矩形領域ペースト  

### PACKEAGE

M-x packeage-list-packeage



# ESCAPE TEXT

<form class="form-horizontal">

<div class="form-group">
<label class="control-label col-xs-6">TEXT</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="ESC_INPUT" ng-init="ESC_INPUT='http://hellowork/jobs'">
</div>
</div>

</form>

``` {.bash}
{{esc_ret()}}
```

# RUBY

## rbenv

### install

git clone

### available versions

``` {.bash}
rbenv install --list
```

### install

``` {.bash}
rbenv install 2.1.2
```

### init

``` {.bash}
rbenv global 2.1.2
```


## ruby-build

### install

``` {.bash}
git clone https://github.com/sstephenson/ruby-build.git .ruby-build
.ruby-build/install.sh
```

``` {.bash}
rm -fr .ruby-build
```

### install version

``` {.bash}
ruby-build 2.1.2 /usr/local
```

### BUNDLER

#### init

``` {.bash}
bundle init
```

#### install GEMS

``` {.bash}
bundle install --path=vendor/bundle
```

#### exec

``` {.bash}
bundle exec ruby app.rb
```


## JSON

パースするとき no ASCII とかいわれたら。


``` {.bash}
export LANG=en_US.UTF8
locale
```

ssh はログイン元の環境変数(LANG)を引継ぐため、意図せず "ja_JP.UTF-8" になってしまう。


# LINUX

## USE DISC MEDIA


<form class="form-horizontal">
<div class="form-group">
<label class="control-label col-xs-6">FILE NAME</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="ISO_FILEPATH" ng-init="ISO_FILEPATH='/filename.iso'">
</div>
</div>
<div class="form-group">
<label class="control-label col-xs-6">MOUNT POINT</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="ISO_MOUNTPOINT" ng-init="ISO_MOUNTPOINT='/mnt/dvd'">
</div>
</div>
</form>



### DISC to ISO FILE

``` {.bash}
dd /dev/dvd of={{ISO_FILEPATH}}
```

### MOUNT ISO FILE

``` {.bash}
mkdir -p {{ISO_MOUNTPOINT}}
mount -t iso9660 -o loop {{ISO_FILEPATH}} {{ISO_MOUNTPOINT}}
```

umount

``` {.bash}
umount {{ISO_MOUNTPOINT}}
```

永続化

###### /etc/fstab

``` {.bash}
echo "{{ISO_FILEPATH}} {{ISO_MOUNTPOINT}} iso9660 loop,ro,auto 0 0" >> /etc/fstab
cat /etc/fstab
mount -a
```


## LOCK TRAY?

VirtualBox やらの VM が邪魔してる場合あり。とめよ。


## MAKE SWAP

### on FILE

<form class="form-horizontal">
<div class="form-group">
<label class="control-label col-xs-6">SWAP FILE NAME</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="LINUX_SWAP_FILE" ng-init="LINUX_SWAP_FILE='/swapfile'">
</div>
</div>
</form>

example 255MB(4096x65536)

``` {.bash}
dd if=/dev/zero  of={{LINUX_SWAP_FILE}} bs=4096 count=65536
mkswap={{LINUX_SWAP_FILE}}
chmod 600 {{LINUX_SWAP_FILE}}
swapon {{LINUX_SWAP_FILE}}
```

#### /etc/fstab

``` {.bash}
{{LINUX_SWAP_FILE}} swap swap defaults
```


# P2V

## physical drive to image file

### physical drive のセクタサイズを調べる

``` {.bash}
sudo fdisk -l /dev/sda
```

#### 出力例

``` {.bash}
ディスク /dev/sda: 500.1 GB, 500107862016 バイト
ヘッド 255, セクタ 63, シリンダ 60801
Units = シリンダ数 of 16065 * 512 = 8225280 バイト
セクタサイズ (論理 / 物理): 512 バイト / 512 バイト
I/O size (minimum/optimal): 512 bytes / 512 bytes
ディスク識別子: 0x6f16023a

デバイス ブート      始点        終点     ブロック   Id  システム
/dev/sda1   *           1          64      512000   83  Linux
パーティション 1 は、シリンダ境界で終わっていません。
/dev/sda2              64      121602   976254976   8e  Linux LVM
```

### dd コマンドでイメージファイル化

``` {.bash}
dd bs=セクタサイズ if=/dev/sda of=sda.dd conv=sync,noerror
```

``` {.bash}
dd bs=セクタサイズ if=/dev/sda conv=sync,noerror | gzip -c9 > sda.dd.gz
```


##### dd の進捗表示

``` {.bash}
sudo watch -n 60 "pkill -USER1 dd"
```

#### イメージファイルの中身確認

##### パーティションテーブル

``` {.bash}
fdisk -l sda.dd
```

##### マウントしてみる


## image file to VDI

自動的に圧縮（最小化ではない）される。

``` {.bash}
vboxmanage convertfromraw sda.dd sda.vdi
```



## 参考情報

### fsck とかで起動しない場合

``` {.bash}
mount -o remount,rw
```

### ゼロ埋め

対象ドライブに cd して、

``` {.bash}
dd if=/dev/zero of=zero bs=4k; \rm zero

```

### 圧縮

``` {.bash}
vboxmanage modifyhd sda.vdi --compact
```


# TMUX

## NEW

```
tmux new -s <session>
```

## KILL

```
tmux kill-session -t <session>
```



# GIT


<form class="form-horizontal">
<div class="form-group">
<label class="control-label col-sm-6">REPO NAME</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="GIT_REPONAME" ng-init="GIT_REPONAME='dir/name.git'">
</div>
</div>
<div class="form-group">
<label class="control-label col-sm-6">REPO ROOT</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="GIT_ROOT" ng-init="GIT_ROOT='/var/lib/git'">
</div>
</div>
<div class="form-group">
<label class="control-label col-sm-6">GIT SERVER NAME</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="GIT_REMOTE" ng-init="GIT_REMOTE='192.168.0.10'">
</div>
</div>
<div class="form-group">
<label class="control-label col-sm-6">GIT SERVER USER</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="GIT_USER" ng-init="GIT_USER='git'">
</div>
</div>
<div class="form-group">
<label class="control-label col-sm-6">GIT SERVER SSH PORT</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="GIT_SSH" ng-init="GIT_SSH='2203'">
</div>
</div>
</form>



## on the SERVER(REMOTE)


### CREATE REMOTE REP.

``` {.bash}
sudo mkdir -p {{GIT_ROOT}}/{{GIT_REPONAME}}
cd {{GIT_ROOT}}/{{GIT_REPONAME}}
sudo git init --bare --shared
sudo chown -R root:git .
ls -la
```


## on the CLIENT(LOCAL)

### CREATE LOCAL REP.

``` {.bash}
git init
git add .
git commit -m "1st"
```

### PUSH to REMOTE

``` {.bash}
git remote add origin ssh://{{GIT_USER}}@{{GIT_REMOTE}}:{{GIT_SSH}}{{GIT_ROOT}}/{{GIT_REPONAME}}
git push origin master
```


### CLONE

``` {.bash}
git clone ssh://{{GIT_USER}}@{{GIT_REMOTE}}:{{GIT_SSH}}{{GIT_ROOT}}/{{GIT_REPONAME}}
```

### COMMIT


<form class="form-horizontal">
<div class="form-group">
<label class="control-label col-sm-6">COMMIT COMMENT</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="GIT_COMMENT" ng-init="GIT_COMMENT='テストコミット'">
</div>
</div>
</form>


``` {.bash}
git add .
git commit -a -m "{{GIT_COMMENT}}"
```


### COMMIT LOG
``` {.bash}
git log
```

### PUSH
```
git push origin master
```

### PULL
``` {.bash}
git pull origin master
```






# DOCKER



## MISC

### install

``` {.bash}
yum install -y docker-io.x86_64
````

### PS

``` {.bash}
watch -n 2 'df -h; echo; free -m; echo; docker ps -a|head; echo; docker images -a'
```




## DOCKERFILE 

``` {.bash}
FROM centos:latest

# EPEL
RUN rpm -i http://ftp.riken.jp/Linux/fedora/epel/6/i386/epel-release-6-8.noarch.rpm
RUN rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-6
RUN yum clean metadata

# yum
RUN yum --enablerepo=epel install -y \
    make \
    gcc \
    zlib-devel \
    openssl-devel \
    readline-devel \
    ncurses-devel \
    gdbm-devel \
    db4-devel \
    libffi-devel \
    tk-devel \
    libyaml-devel \
    tar \
    git

# Install ruby-build
RUN git clone https://github.com/sstephenson/ruby-build.git .ruby-build
RUN .ruby-build/install.sh
RUN rm -fr .ruby-build

# Install ruby
RUN ruby-build 2.1.2 /usr/local

# Install bundler
RUN gem update --system
RUN gem install bundler --no-rdoc --no-ri
```

# IPTABLES

``` {.bash}
● 現在の設定の確認
iptables -L

● FORWARDは使わない
iptables -P FORWARD DROP

● まずは全許可に
iptables -P INPUT ACCEPT

● デフォルトのルールを全て削除
iptables -F

● 自分自身からのパケットは全許可
iptables -A INPUT -i lo -j ACCEPT

● SSH許可 or SSH自分(255.255.255.255)だけ許可
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
 or
 iptables -A INPUT -s 255.255.255.255 -p tcp --dport 22 -j ACCEPT

● FTP(20,21,4000-4029) の接続を許可
iptables -A INPUT -p tcp --dport 20 -j ACCEPT
iptables -A INPUT -p tcp --dport 21 -j ACCEPT
iptables -A INPUT -p tcp --dport 4000:4029 -j ACCEPT

● http, https の接続を許可
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

● POP(受信メール)の許可
iptables -A INPUT -p tcp --dport 110 -j ACCEPT

● SMTP(送信メール)の許可【これをしないと世間からメールが来なくなる！】
iptables -A INPUT -p tcp --dport 25 -j ACCEPT

● SUBMISSION ポートを開放
iptables -A INPUT -p tcp --dport 587 -j ACCEPT

● PostgreSQLも外から使います
iptables -A INPUT -p tcp --dport 5432 -j ACCEPT

● DNS関係
iptables -A INPUT -p tcp --dport 53 -j ACCEPT
iptables -A INPUT -p udp --dport 53 -j ACCEPT

● PINGを許可
iptables -A INPUT -p icmp -j ACCEPT

● TCPの接続開始と応答、FTPデータなどを許可【これをしないと外にメールが飛ばなくなる】
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

● 設定したルール以外のパケットを拒否
iptables -P INPUT DROP
```



### port forward

#### vsftpd

``` {.bash}
pasv_enable=YES
pasv_min_port=20
pasv_max_port=20
pasv_address={global_ip_address}

iptables -I FORWARD -p tcp --dport 20 -j ACCEPT
```


## COMMAND GRAPH

<div id="docker_graph" style="width: 100%; height: 300px; border: 1px solid lightgray;">
  <div id="graph-navigation_wrapper" style="position: absolute; width: 100%; height: 300px;">
    <div id="graph-navigation_zoomExtends" class="graph-navigation zoomExtends">
    </div>
  </div>
  <div class="graph-frame" style="position: relative; overflow: hidden; width: 100%; height: 100%;">
    <canvas style="position: relative; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); width: 100%; height: 100%"></canvas>
  </div>
</div>

<script type="text/javascript">
var container = document.getElementById('docker_graph');
var data = {dot: 'digraph { \
\
REGISTER   [shape=box,fontColor=white,color=red]; \
Dockerfile [shape=box,fontColor=white,color=red]; \
IMAGE      [shape=box]; \
CONTAINER  [shape=box]; \
Running    [shape=circle]; \
Stoped     [shape=circle]; \
SAVEFILE   [shape=box]; \
EXPORTFILE [shape=box]; \
\
Dockerfile -- build -> IMAGE; \
\
REGISTER -- pull -> IMAGE ; \
REGISTER -- login  ; \
REGISTER -- search ; \
REGISTER -- tag    ; \
\
IMAGE -- push -> REGISTER  ; \
IMAGE -- run  -> CONTAINER ; \
IMAGE -- save -> SAVEFILE -- LOAD -> IMAGE ; \
IMAGE -- history ; \
IMAGE -- images  ; \
IMAGE -- insert  ; \
IMAGE -- rmi     ; \
IMAGE -- load    ; \
IMAGE -- inspect ; \
\
CONTAINER -- commit -> IMAGE      ; \
CONTAINER -- export -> EXPORTFILE -- import -> IMAGE ; \
CONTAINER -- Running ; \
CONTAINER -- Stoped  ; \
CONTAINER -- inspect ; \
CONTAINER -- logs    ; \
CONTAINER -- port    ; \
CONTAINER -- ps      ; \
CONTAINER -- diff    ; \
\
Running  -- attach   ; \
Running  -- cp       ; \
Running  -- top      ; \
Running  -- stop     [dir = none, weight = 100]; \
Running  -- kill     ; \
Running  -- restart  ; \
Running  -- wait     ; \
\
Stoped -- start -> Running ; \
Stoped -- rm ;    \
\
}'};
var graph = new vis.Graph(container, data);
</script>




## USE



<form class="form-horizontal">

<div class="form-group">
<label class="control-label col-sm-6">TARG REPOSITORY</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="DOCKER_TARG_REPO" ng-init="DOCKER_TARG_REPO='ubuntu'">
</div>
</div>

<div class="form-group">
<label class="control-label col-sm-6">TARG TAG</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="DOCKER_TARG_TAG" ng-init="DOCKER_TARG_TAG='ruby2'">
</div>
</div>

<div class="form-group">
<label class="control-label col-sm-6">IMAGE ID</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="DOCKER_IMAGE_ID" ng-init="DOCKER_IMAGE_ID='${IMAGE_ID}'">
</div>
</div>

<div class="form-group">
<label class="control-label col-sm-6">CONTAINER ID</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="DOCKER_CONTAINER_ID" ng-init="DOCKER_CONTAINER_ID='${CONTAINER_ID}'">
</div>
</div>

</form>



### BUILD

``` {.bash}
docker build -t {{DOCKER_TARG_REPO}}:{{DOCKER_TARG_TAG}} .
```

``` {.bash}
docker build --rm=true -t {{DOCKER_TARG_REPO}}:{{DOCKER_TARG_TAG}} .
```



### RUN / STOP


#### RUN

``` {.bash}
docker run -i -t {{DOCKER_TARG_REPO}}:{{DOCKER_TARG_TAG}} /bin/bash
```

``` {.bash}
docker run -i -t {{DOCKER_TARG_REPO}}:{{DOCKER_TARG_TAG}} /usr/sbin/sshd -D
```

#### STOP

``` {.bash}
docker stop {{DOCKER_CONTAINER_ID}}
```

#### ALL STOP

``` {.bash}
docker stop `docker ps -aq`
```



### COMMIT

``` {.bash}
docker commit {{DOCKER_CONTAINER_ID}} {{DOCKER_TARG_REPO}}:{{DOCKER_TARG_TAG}}
```

### EXPORT / IMPORT

差分統合される。

#### EXPORT

``` {.bash}
docker export {{DOCKER_CONTAINER_ID}} > {{DOCKER_TARG_REPO}}:{{DOCKER_TARG_TAG}}.export.tar
```

#### IMPORT

``` {.bash}
cat {{DOCKER_TARG_REPO}}:{{DOCKER_TARG_TAG}}.export.tar | docker import - {{DOCKER_TARG_REPO}}:{{DOCKER_TARG_TAG}}
```


### SAVE / LOAD

差分統合されない。

#### SAVE

``` {.bash}
docker save {{DOCKER_TARG_REPO}}:{{DOCKER_TARG_TAG}} > {{DOCKER_TARG_REPO}}:{{DOCKER_TARG_TAG}}.save.tar
```

#### LOAD

``` {.bash}
docker load < {{DOCKER_TARG_REPO}}:{{DOCKER_TARG_TAG}}.save.tar
```




### REMOVE ALL CONTAINER

``` {.bash}
docker rm `docker ps -aq`
```








### images tree
-tree もうすぐなくなる...

``` {.bash}
docker images -tree
```


### all images list

``` {.bash}
docker images -a
```


### remove images

``` {.bash}
docker rmi <IMAGE ID> 
```


### remove all homeless images

消えないもの

 * コミット済み image に依存されている？
 * コンテナが残っとる？
 * コンテナが動いとる？

``` {.bash}
docker rmi $(docker images -a | awk '/^<none>/ {print $3}') 
```

### ALL CLEAR

``` {.bash}
docker stop `docker ps -aq`
docker rm `docker ps -aq`
docker rmi $(docker images -a | awk '{print $3}')
```

docker rmi $(docker images -a | awk '{print $3}')




## boot2docker

### install

``` {.bash}
brew install docker boot2docker
```

### up

``` {.bash}
boot2docker init
boot2docker up
```

### ssh

password: tcuser

``` {.bash}
boot2docker ssh
```



### DOCKER_HOST

``` {.bash}
export DOCKER_HOST=tcp://localhost:4243
```


# ANSIBLE

## BASICS

### ping

実行前に接続できるか確認する。

``` {.bash}
ansible -i hosts all -m ping
```

### run playbook

``` {.bash}
ansible-playbook -i hosts site.yml
```

## roll

### send file

``` {.yaml}
- name: copy CENTOS iso file 1
  copy: src=CentOS-6.5-x86_64-bin-DVD1.iso dest=/mnt/ owner=root group=root mode=644
```


### mkdir

``` {.yaml}
- name: make mount position
  file: path=/mnt/CentOS-6.5_1 owner=root group=root mode=644 state=directory
```



### mod file line

``` {.yaml}
- name: MODFILE "yum.conf"
  lineinfile: dest=/etc/yum.conf  regexp=^keepcache  line=keepcache=1
```


### yums

``` {.yaml}
- name: yum install depend pkg
  yum: name={{ item }} state=installed disablerepo=* enablerepo=c6-media
  with_items:
    - compat-libstdc++-33
    - elfutils-libelf-devel
    - elfutils-libelf-devel-static
    - gcc
    - gcc-c++
    - glibc-devel
    - glibc-headers
    - kernel-headers
    - libaio-devel
    - libgomp
    - libstdc++-devel
    - sysstat
```


### add group & user 

``` {.yaml}
- name: create group
  group: name={{item.name}} gid={{item.gid}} state=present
  with_items:
    - { name: "oinstall" , gid: 701}
    - { name: "dba"      , gid: 702}
    - { name: "oracle"   , gid: 703}
    - { name: "oper"     , gid: 704}

- name: create user
  user: name={{item.name}} uid={{item.uid}} password={{item.pass}} group=oinstall groups=dba,oper createhome=yes state=present
  with_items:
    - { name: "oracle" , uid: 701, pass: "$1$SomeSalt$c7SWNheGRHNaCLwuAG7Sa." }
```

#### make password

``` {.python}
python -c 'import crypt; print crypt.crypt("REPLACE:username", "$1$SomeSalt$")'
```

#### exec shell command

``` {.yaml}
- name:	yum install
  shell: yum --disablerepo=\* -y localinstall /opt/rpm/*.rpm > /opt/rpm/res.txt
```

command もあるが、なんか違う。


# test

## ファイルの有無

``` {.bash}
test ! -e /vagrant/rpm/gitlab-7.3.2_omnibus-1.el6.x86_64.rpm; echo $?
```

# grep

## AND

``` {.bash}
grep 'AAA' | grep 'BBB'
```

``` {.bash}
grep 'AAA.*BBB'
```

## OR

``` {.bash}
grep 'AAA\|BBB'
```


## NOT

``` {.bash}
grep -v 'AAA'
```


## 前後も表示

 * -B マッチ「前」の行数
 * -A マッチ「後」の行数

``` {.bash}
grep -B 3 -A 3 'xyz' *.txt
```



# sed

## ファイルを直接置換え

``` {.bash}
sed -i -e 's/AAA/ZZZ/g' FILENAME.txt
```





# echo

## 改行しない

``` {.bash}
echo -n 'ZZZ...'
```

## COLOR/STYLE

### GREEN

``` {.bash}
          \e[32m  \e[m
          <---->  <-->
echo -e '[\e[32mOK\e[m]'
```

### RED

``` {.bash}
          \e[31m  \e[m
          <---->  <-->
echo -e '[\e[31mNG\e[m]'
```

### BOLD

``` {.bash}
         \e[1m         \e[m
         <--->         <-->
echo -e '\e[1mI AM BOLD\e[m'
```

### RED + BOLD

``` {.bash}
            \e[1m\e[31m        \e[m
            <---><---->        <-->
echo -e 'zzz\e[1m\e[31mRED+BOLD\e[mzzz'
```

### What Ever

``` {.bash}
echo -e "
# Attribute codes:
# 00=none 01=bold 04=underscore 05=blink 07=reverse 08=concealed
# Text color codes:
# 30=black 31=red 32=green 33=yellow 34=blue 35=magenta 36=cyan 37=white
# Background color codes:
# 40=black 41=red 42=green 43=yellow 44=blue 45=magenta 46=cyan 47=white

状態番号
\033[00m デフォルト状態 00 \033[00m
\033[01m 強調           01 \033[00m
\033[04m 下線           04 \033[00m
\033[05m 点滅           05 \033[00m
\033[07m 色反転         07 \033[00m
\033[08m 塗りつぶし     08 \033[00m(塗りつぶし 08)

色番号
\033[30m 黒               30 \033[00m \033[40m 40 \033[00m \033[31;40m 31;40 \033[00m \033[32;00;40m 32;00;40 \033[00m
\033[31m 赤               31 \033[00m \033[41m 41 \033[00m \033[32;41m 32;41 \033[00m \033[33;01;41m 33;01;41 \033[00m
\033[32m 緑               32 \033[00m \033[42m 42 \033[00m \033[33;42m 33;42 \033[00m \033[34;04;42m 34;04;42 \033[00m
\033[33m 黄(または茶)     33 \033[00m \033[43m 43 \033[00m \033[34;43m 34;43 \033[00m \033[35;05;43m 35;05;43 \033[00m
\033[34m 青               34 \033[00m \033[44m 44 \033[00m \033[35;44m 35;44 \033[00m \033[36;07;44m 36;07;44 \033[00m
\033[35m 紫               35 \033[00m \033[45m 45 \033[00m \033[36;45m 36;45 \033[00m \033[37;00;45m 37;00;45 \033[00m
\033[36m シアン           36 \033[00m \033[46m 46 \033[00m \033[37;46m 37;46 \033[00m \033[30;01;46m 30;01;46 \033[00m
\033[37m 白(またはグレー) 37 \033[00m \033[47m 47 \033[00m \033[30;47m 30;47 \033[00m \033[31;04;47m 31;04;47 \033[00m
"
```


# iconv

Windows SJIS は、 SHIFT_JISX0213 とすべし。

## 文字コード一覧表示

``` {.bash}
iconv -l
```

## EUC -> UTF-8

``` {.bash}
iconv -f EUC-JP -t UTF-8 FILE -o FILE.utf8
```

## SJIS -> UTF-8

``` {.bash}
iconv -f SHIFT_JISX0213 -t UTF-8 FILE -o FILE.utf8
```

## 一括処理

### カレントディレクトリ以下

``` {.bash}
find -type f | xargs file | grep ":.*text" | cut -d : -f1 | xargs -t -I{} iconv -f EUC-JP -t UTF-8 {} -o {}.utf8
```



# ファイルの内容置換

<form class="form-horizontal">

<div class="form-group">
<label class="control-label col-sm-6">BEFOR</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="CMD_REPLACE_BEFOR" ng-init="CMD_REPLACE_BEFOR='BEFOR'">
</div>
</div>

<div class="form-group">
<label class="control-label col-sm-6">AFTER</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="CMD_REPLACE_AFTER" ng-init="CMD_REPLACE_AFTER='AFTER'">
</div>
</div>

<div class="form-group">
<label class="control-label col-sm-6">FILENAME</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="CMD_REPLACE_FILENAME" ng-init="CMD_REPLACE_FILENAME='*.html'">
</div>
</div>

</form>


``` {.bash}
grep -rl "{{CMD_REPLACE_BEFOR}}" */{{CMD_REPLACE_FILENAME}}
perl -p -i.befor -e 's/{{CMD_REPLACE_BEFOR}}/{{CMD_REPLACE_AFTER}}/g' {{CMD_REPLACE_FILENAME}}
```


``` {.bash}
find . -name '{{CMD_REPLACE_FILENAME}}' -type f -exec sed -i 's/{{CMD_REPLACE_BEFOR}}/{{CMD_REPLACE_AFTER}}/g' {} \;
```
 




# date

## from 通算秒 to 日時

``` {.bash}
date -d "1970-01-01 UTC 4294967295 seconds" '+%Y-%m-%d %H:%M:%S'
```

## from 日時 to 通算秒

``` {.bash}
date -d "2000-01-01 00:00:00" +%s
```


## WATCH

```{.bash}
watch -t -n 0.1 --no-title "date  +'%n +------------+%n | %Y-%m-%d |%n +------------+%n |  %H:%M:%S  |%n +------------+%n | %N0 |%n +------------+%n | %s |%n +------------+'"
```

```{.bash}
while true;do date +"%Y-%m-%d %H:%M:%S.%N";sleep 1;done
```

## TIMER

```{.bash}
watch -n 0.1 --no-title 'expr `date +%s -d "2020-12-31 23:59:59"` - `date +%s`'
```


## 日時書式

``` {.bash}
date
date +"%Y-%m-%d %H:%M:%S"
```

## OFFSET

``` {.bash}
date
date -d "12 hours ago"
date -d "12 hours"
```




### ファイル検索 & コマンド実行

``` {.bash}
find | grep <検索文字> | xargs <コマンド>
```



<form class="form-horizontal">

<div class="form-group">
<label class="control-label col-sm-6">FILE1</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="CMD_FILE1" ng-init="CMD_FILE1='file1'">
</div>
</div>

<div class="form-group">
<label class="control-label col-sm-6">FILE2</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="CMD_FILE2" ng-init="CMD_FILE2='file2'">
</div>
</div>

</form>




### ナイスな diff

``` {.bash}
diff -y --suppress-common-lines {{CMD_FILE1}} {{CMD_FILE2}}
```

### ファイルの単純横結合

``` {.bash}
paste  {{CMD_FILE1}} {{CMD_FILE2}}
```

### プロンプト反転

``` {.bash}
PS1="\[\033[07m\][\u@${HOSTNAME} \W]\\$\[\033[00m\] "
```



### pgrep

``` {.bash}
pgrep procname*
```

#### pkill and kill

``` {.bash}
pgrep procname* | xargs kill -9
```




### exfat

``` {.bash}
sudo mount -t exfat-fuse /dev/sde1 /media/exfat
umount /media/exfat
```

### LANG

``` {.bash}
export LANG=en_US.UTF-8
```


### scp

``` {.bash}
scp -P 22 -rq tcp/ username@192.168.33.32:/home/aaa/
```

# VI

## EDIT

### 置換え

#### 確認あり

``` {.bash}
:%s/前/後/gc
```

#### 確認なし

``` {.bash}
:%s/前/後/g
```

## VIEW

### カーソル移動

 key  move  
----- ----- 
 1G   1 行目のあたま  
 G    最終行のケツ
 ~    今の行のあたま
 $    今の行のケツ

# WINDOWS

## NETWORK

ドス窓は管理者権限で実行

### IP アドレス設定

```
netsh interface ipv4 set address name="ローカル エリア接続" addr=192.2.56.111 mask=255.255.255.0 gateway=192.2.56.1
```

### IP アドレス追加

追加の場合は gateway 不要
 
```
netsh interface ipv4 add address name="ローカル エリア接続" addr=192.2.56.111 mask=255.255.255.0
```

### IP アドレス削除

```
netsh interface ipv4 del address name="ローカル エリア接続" addr=192.2.56.111
```


### 各種情報収集

```
mkdir .\%COMPUTERNAME%
cd .\%COMPUTERNAME%

echo ""        > 10_SYSTEM
systeminfo     > 11_SYSTEM__systeminfo.txt
msinfo32 /report 12_SYSTEM__msinfo32.txt

echo ""        > 20_NETWORK
ipconfig /all  > 21_NETWORK__ipconfig_all.txt
route print    > 22_NETWORK__route_print.txt
netstat -sp    > 23_NETWORK__netstat_sp.txt
netstat -e     > 24_NETWORK__netstat_e.txt
net use        > 25_NETWORK__net_use.txt

echo ""            > 30_TASK
schtasks /query /V > 31_TASK__shttasks.txt
tasklist           > 32_TASK__tasklist.txt
tasklist /svc      > 33_TASK__tasklist_svc.txt
tasklist /m        > 34_TASK__tasklist_m.txt

echo ""                        > 40_LOG
wevutil qe system      /f:TEXT > 41_LOG__wevutil_qe_system.txt
wevutil qe Application /f:TEXT > 42_LOG__wevutil_qe_application.txt
```




# NXR120


## Web

```
http://IPADDRESS:880/
(admin/admin)
```

## ssh

### 設定の確認

```
show config
```

### default gateway

```
configure terminal
ip route 0.0.0.0/0 196.1.58.1
exit
save config
```



### 1:1 NAT

<form class="form-horizontal">

<div class="form-group">
<label class="control-label col-sm-6">ethernet0 IP</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="nxr_e0ip" ng-init="nxr_e0ip='192.168.0.1'">
</div>
</div>

<div class="form-group">
<label class="control-label col-sm-6">host IP</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="NXR_RIP" ng-init="NXR_RIP='192.168.0.10'">
</div>
</div>

<div class="form-group">
<label class="control-label col-sm-6">ethernet1 IP</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="nxr_e1ip" ng-init="nxr_e1ip='11.22.33.44'">
</div>
</div>

<div class="form-group">
<label class="control-label col-sm-6">host virtIP</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="nxr_vip" ng-init="nxr_vip='11.22.33.10'">
</div>
</div>

</form>




```
show config
configure terminal

system dnat-group DNAT
system snat-group SNAT
ip dnat DNAT ip any {{nxr_vip}} {{NXR_RIP}}
ip snat SNAT ip {{NXR_RIP}} any {{nxr_vip}}

interface ethernet 0

  ip address {{nxr_e0ip}}/24
  ip snat-group SNAT
  exit

interface ethernet 1

  ip address {{nxr_e1ip}}/24
  ip address {{nxr_vip}}/24 secondary
  ip dnat-group DNAT
  exit

exit
save config
restart
```

### ip filter

```
configure terminal

ip access-list 55555 permit any any tcp any 55555
ip access-list eth0_in permit 196.1.58.0/24 192.1.58.220/32 tcp any 880
ip access-list eth0_in permit any any icmp
ip access-list eth0_in deny any any
ip access-list eth1_forward_in permit 195.200.58.33 any tcp any range 1024 65535
ip access-list eth1_forward_in permit any any icmp
ip access-list eth1_forward_in permit any any tcp any range 80 81
ip access-list eth1_forward_in permit any any tcp any 8081
ip access-list eth1_forward_in permit any any tcp any 8084
ip access-list eth1_forward_in permit any any tcp range 80 81 any
ip access-list eth1_forward_in permit any any tcp 8081 any
ip access-list eth1_forward_in permit any any tcp 8084 any
ip access-list eth1_forward_in permit 196.1.58.0/24 195.200.58.33/32 tcp any range 1024 65535
ip access-list eth1_forward_in deny any any
ip access-list eth1_in permit 195.200.58.33/32 any tcp any 80
ip access-list eth1_in permit 195.200.58.33/32 any tcp any range 1024 65535
ip access-list eth1_in permit any any icmp
ip access-list eth1_in deny any any

exit
save config
restart
```


### 設定の無効化

    頭に no をつける



# SSH

## NO PASS LOGIN

### on LOCAL

#### keygen

``` {.bash}
ssh-keygen
ssh-add ./id_rsa...?
cat ~/.ssh/id_rsa.pub
```

### on SERVER

#### paste

``` {.bash}
/home/USERNAME/.ssh/authorized_keys
```



# CENTOS

## single user mode

 + 起動カウントダウン中に [ENTER] を押す。
 + karnel... の行を選んで [e] を押す。
 + 起動オプションの末尾に [スペース]+single を追記して [ENTER] を押す。
 + karnel... の行を選んで [b] を押す。



## SELINUX

### 状況確認

``` {.bash}
getenforce
```

### 一時的な OFF

``` {.bash}
setenforce 0
```

### 恒久的な OFF

#### /etc/selinux/config

``` {.bash}
SELINUX=disabled
```


## NETWORK

<form class="form-horizontal">

<div class="form-group">
<label class="control-label col-sm-6">I/F NAME</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="CENT_NET_IFNAME" ng-init="CENT_NET_IFNAME='eth0'">
</div>
</div>

</form>



### IP アドレス・リンクスピード固定化

#### /etc/sysconfig/network-scripts/ifcfg-eth0

``` {.bash}
HWADDR=XX:XX:XX:XX:XX:XX
DEVICE={{CENT_NET_IFNAME}}
BOOTPROTO=none
ONBOOT=yes
USERCTL=no
IPV6INIT=no
PEERDNS=no
TYPE=Ethernet
IPADDR=192.168.1.10
NETMASK=255.255.255.0
ETHTOOL_OPTS="autoneg off speed 10 duplex full"
```

#### sudo
``` {.bash}
service network restart
```

### IP エイリアス

#### sudo

``` {.bash}
cd /etc/sysconfig/network-scripts
cp ifcfg-{{CENT_NET_IFNAME}} ifcfg-{{CENT_NET_IFNAME}}:1
```

#### /etc/sysconfig/network-scripts/ifcfg-{{CENT_NET_IFNAME}}:1

``` {.bash}
HWADDR=XX:XX:XX:XX:XX:XX
DEVICE={{CENT_NET_IFNAME}}:1
BOOTPROTO=none
ONBOOT=yes
USERCTL=no
IPV6INIT=no
PEERDNS=no
TYPE=Ethernet
IPADDR=192.168.1.10
NETMASK=255.255.255.0
ETHTOOL_OPTS="autoneg off speed 10 duplex full"
```

``` {.bash}
service network restart
```

### スタティックルート

#### /etc/sysconfig/static-routes

``` {.bash}
any net 123.1.2.0 netmask 255.255.255.0 gw 192.168.0.201
```

#### sudo

``` {.bash}
service network restart
```

### デフォルトゲートウェイ・ホスト名

#### /etc/sysconfig/network

``` {.bash}
NETWORKING=yes
NETWORKING_IPV6=no
HOSTNAME=SERVERNAME
GATEWAY=192.168.0.123
```

``` {.bash}
service network restart
```


# YUM

<form class="form-horizontal">

<div class="form-group">
<label class="control-label col-sm-6">PKG NAME</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="YUM_PKG" ng-init="YUM_PKG='httpd'">
</div>
</div>

<div class="form-group">
<label class="control-label col-sm-6">OPT</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="YUM_OPT" ng-init="YUM_OPT='--disablerepo=\\* --enablerepo=c6-media'">
</div>
</div>

</form>



## REPO

### FILES

``` {.bash}
/etc/yum.repos.d
```

### ADD

#### EPEL

``` {.bash}
yum install epel-release
```

``` {.bash}
curl http://dl.fedoraproject.org/pub/epel/RPM-GPG-KEY-EPEL-6 \
  -o $RPMDIR/RPM-GPG-KEY-EPEL-6
curl http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm \
  -o $RPMDIR/epel-release-6-8.noarch.rpm

sudo rpm --import file://$RPMDIR/RPM-GPG-KEY-EPEL-6
sudo rpm -ihv file://$RPMDIR/epel-release-6-8.noarch.rpm
```

### ON/OFF REPO

``` {.bash}
yum --disablerepo=\* --enablerepo=c6-media ...
```

## PACKAGE

### dependencies

``` {.bash}
yum deplist {{YUM_PKG}} {{YUM_OPT}}
```

``` {.bash}
yum deplist {{YUM_PKG}} {{YUM_OPT}} | grep provider
```

### DOWNLOAD

``` {.bash}
yumdownloader --resolve {{YUM_PKG}}
```

### INSTALL from LOCAL RPM

``` {.bash}
yum --disablerepo=\* -y localinstall ./*.rpm
```

### LIST

``` {.bash}
yum {{YUM_OPT}} list
```



# CHEF

## MISC

### CREATE cookbok

``` {.bash}
knife cookbook create app -o site-cookbooks
```


# VirualBox

## image

### from vmware

``` {.bash}
VBoxManage clonehd --format VDI cyua.vmdk cyua.vdi
```



# VAGRANT

<form class="form-horizontal">

<div class="form-group">
<label class="control-label col-sm-6">BOX FILE</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="VAG_BOX_FILE" ng-init="VAG_BOX_FILE='./package.box'">
</div>
</div>


<div class="form-group">
<label class="control-label col-sm-6">BOX NAME</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="VAG_BOX_NAME" ng-init="VAG_BOX_NAME='centos65-x86_64-20131205'">
</div>
</div>

<div class="form-group">
<label class="control-label col-sm-6">VM NAME</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="VAG_VM_NAME" ng-init="VAG_VM_NAME='vm1'">
</div>
</div>

<div class="form-group">
<label class="control-label col-sm-6">VM STATIC IP</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="VAG_VM_IP" ng-init="VAG_VM_IP='192.168.0.111'">
</div>
</div>

<div class="form-group">
<label class="control-label col-sm-6">VM SSH PORT</label>
<div class="col-sm-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="VAG_SSH_PORT" ng-init="VAG_SSH_PORT='2205'">
</div>
</div>

</form>

## BOX

### ADD

``` {.bash}
vagrant box add {{VAG_BOX_NAME}} {{VAG_BOX_FILE}}
vagrant box list
```

### VMs STATUS

``` {.bash}
vagrant global-status
```

## Vagrantfile

``` {.ruby}
# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

NUM_INSTANCES = 2
BASE_IP_ADDR  = ENV['BASE_IP_ADDR'] || "192.168.100"


Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "chef/centos-6.5"
  config.vm.synced_folder "~/src/", "/vagrant/src"

  (1..NUM_INSTANCES).each do |i|

    config.vm.define "dummy-#{i}" do |dummy|
      dummy.vm.box_check_update = false
      dummy.vm.hostname = "dummy-#{i}"
      dummy.vm.network :private_network, ip: "#{BASE_IP_ADDR}.#{i}"
    end

    config.vm.provider "virtualbox" do |vbox|
      vbox.gui = false
      vbox.customize ["modifyvm", :id, "--memory", "1000"]
      # centos 6.5 slow network fix
      vbox.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
      vbox.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    end

  end

end
```

## ssh

### ssh config

``` {.bash}
vagrant up
vagrant ssh-config vm1  >> ~/.ssh/config
vagrant ssh-config vm2 >> ~/.ssh/config
cat ~/.ssh/config
```

## provision

### with chef

``` {.bash}
vagrant halt
vagrant sandbox on
vagrant up

echo vm1 vm2 | xargs -n 1 knife solo prepare 

vagrant halt
vagrant sandbox commit
vagrant up

echo vm1 vm2 | xargs -n 1 knife solo cook
```

## PLUG-IN

### sandbox

#### sandboxモード開始

``` {.bash}
vagrant sandbox on
```

#### 変更を決定する

``` {.bash}
vagrant sandbox commit
```

#### 変更を破棄し、ロールバックする

``` {.bash}
vagrant sandbox rollback
```

#### sandboxモード終了（commitしていないものは破棄される）

``` {.bash}
vagrant sandbox off
```

#### 現在sandboxモードかどうかの確認

``` {.bash}
vagrant sandbox status
```



# ORACLE

## SETTING


### TNSNAMES.ORA

``` {.bash}
cat $ORACLE_HOME/network/admin/tnsnames.ora
```

### TNSNAMES.ora, LISTENER.ora

``` {.bash}
cd $ORACLE_HOME/network/admin
```

### STOP, START, RESTART

``` {.bash}
service dbora stop
service dbora start
service dbora restart
```


## SQLPLUS

### exec *.sql

``` {.bash}
sqlplus <USER>/<PASS>@<TNSNAME> @<FILE>
```

``` {.bash}
sqlplus <USER>/<PASS>@<SID> @<FILE>
```

### CSV

``` {.sql}
set colsep ','
set pagesize 0
set trimspool off
set headsep off
set linesize 32767
set feedback off
-- set numw X
```




## Enterprise Manager

### UP/DOWN

``` {.bash}
emctl start dbconsole
emctl stop dbconsole
```

``` {.bash}
ORACLE_UNQNAME=KX emctl start dbconsole
```

## SQL

<form class="form-horizontal">

<div class="form-group">
<label class="control-label col-xs-6">TAB NAME</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="ORA_TAB_NAME" ng-init="ORA_TAB_NAME='TABNAME'">
</div>
</div>

</form>

### insert

``` {.sql}
insert into {{ORA_TAB_NAME}} (<COL1> ,<COL2>) values (<COL1VAL>,<COL2VAL>);
```

### update

``` {.sql}
update {{ORA_TAB_NAME}} set <COL1>='AAA' , <COL2>='BBB' where <COL3>='ZZZ';
```

### PRIME?

``` {.sql}
select column_name from user_cons_columns
where constraint_name = (
      select constraint_name from user_constraints
      where table_name = '" + tab + "' and constraint_type = 'P'
)
```


### get instance name

``` {.sql}
select sys_context('USERENV', 'instance_name') from dual;
```


### DB Link

#### connect

``` {.bash}
sqlplus sys/manager@<db> as sysdba
```

#### show status

``` {.sql}
set linesize 100
col OWNER    format a10
col DB_LINK  format a20
col USERNAME format a10
col HOST     format a15
col CREATED  format a20
col PASSWORD format a20
select * from dba_db_links;
```

#### create

``` {.sql}
CREATE PUBLIC DATABASE LINK <LINKNAME>
connect to <USER> identified by <PASS>
using '<DB>';
```


### get object source

``` {.sql}
select
  dbms_metadata.get_ddl (
     <OBJECT_TYPE>
   , <OBJECT_NAME>
   , <OWNER>
  )
from
  dual
;
```


## MULTI MASTER REPLICATION

<form class="form-horizontal">

<div class="form-group">
<label class="control-label col-xs-6">SITE A</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="ORA_REPSITE_A" ng-init="ORA_REPSITE_A='AAA'">
</div>
</div>

<div class="form-group">
<label class="control-label col-xs-6">SITE B</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="ORA_REPSITE_B" ng-init="ORA_REPSITE_B='BBB'">
</div>
</div>

<div class="form-group">
<label class="control-label col-xs-6">TNS</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="ORA_REPTNSNAME" ng-init="ORA_REPTNSNAME='DB'">
</div>
</div>

<div class="form-group">
<label class="control-label col-xs-6">TABLE</label>
<div class="col-xs-6">
<input class="form-control" type="text" onclick="this.select();" ng-model="ORA_REP_TABNAME" ng-init="ORA_REP_TABNAME='TABLENAME'">
</div>
</div>

</form>



### SQLPLUS

``` {.bash}
sqlplus /nolog
```


### CREATE REPADMIN

#### {{ORA_REPSITE_A}}

``` {.sql}
conn sys/manager@{{ORA_REPSITE_A}}_{{ORA_REPTNSNAME}} as sysdba

CREATE USER repadmin IDENTIFIED BY repadmin;
GRANT COMMENT ANY TABLE TO repadmin;
GRANT LOCK ANY TABLE TO repadmin;
GRANT SELECT ANY DICTIONARY TO repadmin;
GRANT EXECUTE ANY PROCEDURE TO repadmin;
EXEC Dbms_Repcat_Admin.Grant_Admin_Any_Repgroup('repadmin');
EXEC Dbms_Repcat_Admin.Grant_Admin_Any_Schema (username => 'repadmin');

-- プロパゲータ（送信者ロール）を登録
EXEC DBMS_DEFER_SYS.REGISTER_PROPAGATOR('repadmin');

-- 受信者（ロール）を登録
BEGIN
   DBMS_REPCAT_ADMIN.REGISTER_USER_REPGROUP (
      username       => 'repadmin',
      privilege_type => 'receiver',
      list_of_gnames => NULL);
END;
/
```

#### {{ORA_REPSITE_B}}

``` {.sql}
conn sys/manager@{{ORA_REPSITE_B}}_{{ORA_REPTNSNAME}} as sysdba

--
-- same {{ORA_REPSITE_A}}
--
```


### CREATE DATABASE LINK

#### {{ORA_REPSITE_A}}

``` {.sql}
conn sys/manager@{{ORA_REPSITE_A}}_{{ORA_REPTNSNAME}} as sysdba

CREATE PUBLIC DATABASE LINK {{ORA_REPSITE_B}}_{{ORA_REPTNSNAME}} USING '{{ORA_REPSITE_B}}_{{ORA_REPTNSNAME}}';
```

``` {.sql}
conn repadmin/repadmin@{{ORA_REPSITE_A}}_{{ORA_REPTNSNAME}}

CREATE DATABASE LINK {{ORA_REPSITE_B}}_{{ORA_REPTNSNAME}}
CONNECT TO repadmin IDENTIFIED BY repadmin using '{{ORA_REPSITE_B}}_{{ORA_REPTNSNAME}}';
```

#### {{ORA_REPSITE_B}}

``` {.sql}
conn sys/manager@{{ORA_REPSITE_B}}_{{ORA_REPTNSNAME}} as sysdba as sysdba

CREATE PUBLIC DATABASE LINK {{ORA_REPSITE_A}}_{{ORA_REPTNSNAME}} USING '{{ORA_REPSITE_A}}_{{ORA_REPTNSNAME}}';
```

``` {.sql}
conn repadmin/repadmin@{{ORA_REPSITE_B}}_{{ORA_REPTNSNAME}}

CREATE DATABASE LINK {{ORA_REPSITE_A}}_{{ORA_REPTNSNAME}}
CONNECT TO repadmin IDENTIFIED BY repadmin using '{{ORA_REPSITE_A}}_{{ORA_REPTNSNAME}}';
```



### CREATE JOB

#### {{ORA_REPSITE_A}}

``` {.sql}
conn repadmin/repadmin@{{ORA_REPSITE_A}}_{{ORA_REPTNSNAME}}

BEGIN
   DBMS_DEFER_SYS.SCHEDULE_PURGE (
      next_date => SYSDATE + (1/24),
      interval => 'SYSDATE + (1/24)',
      delay_seconds => 0,
      rollback_segment => ''
   );
END;
/
-- 1/24 = １時間

BEGIN
   DBMS_DEFER_SYS.SCHEDULE_PUSH(
      destination => '{{ORA_REPSITE_B}}_{{ORA_REPTNSNAME}}.WORLD',
      next_date => SYSDATE + (1/8640),
      interval  => 'SYSDATE + (1/8640)',
      parallelism => 1,
      delay_seconds => 0
   );
END;
/
-- 1/8640 = 10sec
```

#### {{ORA_REPSITE_B}}

``` {.sql}
conn repadmin/repadmin@{{ORA_REPSITE_B}}_{{ORA_REPTNSNAME}}

BEGIN
   DBMS_DEFER_SYS.SCHEDULE_PURGE (
      next_date => SYSDATE + (1/24),
      interval => 'SYSDATE + (1/24)',
      delay_seconds => 0,
      rollback_segment => ''
   );
END;
/
-- 1/24 = １時間

BEGIN
   DBMS_DEFER_SYS.SCHEDULE_PUSH(
      destination => '{{ORA_REPSITE_A}}_{{ORA_REPTNSNAME}}.WORLD',
      next_date => SYSDATE + (1/8640),
      interval  => 'SYSDATE + (1/8640)',
      parallelism => 1,
      delay_seconds => 0
   );
END;
/
-- 1/8640 = 10sec
```

#### Check

``` {.sql}
-- conn repadmin/repadmin@???_{{ORA_REPTNSNAME}}

set linesize 150
col job    format '00000'
col what  format a65
col SCHEMA_USER format a10
col LAST_DATE format a10
col THIS_DATE format a10
col NEXT_DATE format a10
col INTERVAL format a10
select job,BROKEN,SCHEMA_USER,LAST_DATE,THIS_DATE,NEXT_DATE,
 INTERVAL, what from user_jobs;
```


### CREATE REPLICATION GROUP

#### {{ORA_REPSITE_A}} ONLY!

``` {.sql}
conn repadmin/repadmin@{{ORA_REPSITE_A}}_{{ORA_REPTNSNAME}}

EXEC DBMS_REPCAT.CREATE_MASTER_REPGROUP('{{ORA_REPTNSNAME}}_REPG');

BEGIN
   DBMS_REPCAT.ADD_MASTER_DATABASE (
      gname     => '{{ORA_REPTNSNAME}}_REPG',
      master    => '{{ORA_REPSITE_B}}_{{ORA_REPTNSNAME}}',
      use_existing_objects => TRUE,
      copy_rows => FALSE,
      propagation_mode => 'ASYNCHRONOUS'
   );
END;
/
```


### ADD OBJECT

#### {{ORA_REPSITE_A}} ONLY!

``` {.sql}
conn repadmin/repadmin@{{ORA_REPSITE_A}}_{{ORA_REPTNSNAME}}

begin DBMS_REPCAT.CREATE_MASTER_REPOBJECT (
  gname => '{{ORA_REPTNSNAME}}_REPG'
, type => 'TABLE'
, oname => '{{ORA_REP_TABNAME}}'
, sname => '{{ORA_REPTNSNAME}}'
, use_existing_object => TRUE  -- 既存のオブジェクトを使用
, copy_rows => FALSE           -- データのコピー
);
end;
/

--（対象テーブル全部を登録する）
```


### GENERATE REPLICATION SUPPORT

#### {{ORA_REPSITE_A}} ONLY!

``` {.sql}
conn repadmin/repadmin@{{ORA_REPSITE_A}}_{{ORA_REPTNSNAME}}

begin DBMS_REPCAT.GENERATE_REPLICATION_SUPPORT (
  sname => '{{ORA_REPTNSNAME}}'
, oname => '{{ORA_REP_TABNAME}}'
, type => 'TABLE'
, min_communication => TRUE);
end;
/
```



### START REPLICATION

#### {{ORA_REPSITE_A}} ONLY!

``` {.sql}
conn repadmin/repadmin@{{ORA_REPSITE_A}}_{{ORA_REPTNSNAME}}

exec dbms_repcat.resume_master_activity(gname => '{{ORA_REPTNSNAME}}_REPG');
```



### STOP REPLICATION

#### {{ORA_REPSITE_A}} ONLY!

``` {.sql}
conn repadmin/repadmin@{{ORA_REPSITE_A}}_{{ORA_REPTNSNAME}}

exec dbms_repcat.suspend_master_activity(gname=>'{{ORA_REPTNSNAME}}_REPG');
```

