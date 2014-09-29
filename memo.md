
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

## JSON

パースするとき no ASCII とかいわれたら。

``` {.bash}
export LANG=en_US.UTF8
locale
```



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



# COMMAND

## GREP

### and

``` {.bash}
grep 'AAA' | grep 'BBB'
```

``` {.bash}
grep 'AAA.*BBB'
```

### or

``` {.bash}
grep 'AAA\|BBB'
```


### not

``` {.bash}
grep -v 'AAA'
```





## MISC

### BELL

``` {.bash}
echo -n $'\a'
```


### iconv



``` {.bash}
iconv -l
```

``` {.bash}
iconv -f EUC-JP -t UTF-8 FILE -o FILE.utf8
```

``` {.bash}
iconv -f SJIS -t UTF-8 FILE -o FILE.utf8
```

``` {.bash}
find -type f | xargs file | grep ":.*text" | cut -d : -f1 | xargs -t -I{} iconv -f EUC-JP -t UTF-8 {} -o {}.utf8
```


### FILE NAME

``` {.bash}
for x in *.csv.utf8;do mv $x ${x%.csv.utf8}".csv";done
```


### 一括置換

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
 




### 通算秒 / 日時

``` {.bash}
date -d "1970-01-01 UTC <通算秒数> seconds" '+%Y-%m-%d %H:%M:%S'
```


### 所要時間測定

 * centos6 minimum だと bc コマンドはいってない。
 * uptime なので時刻調整されても問題ないはず。
 * cat /proc/uptime の2つ目はアイドル時間数とのこと。

``` {.bash}
IFS=" "
read -a t1 <<< `cat /proc/uptime`;date
sleep 5
read -a t2 <<< `cat /proc/uptime`;date
td=`echo "${t2[0]}-${t1[0]}" | bc`
echo "${td} sec."
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

### 日時書式

``` {.bash}
date +"%Y_%m_%d__%H_%M_%S"
```

### OFFSET

``` {.bash}
date +"%Y_%m_%d__%H_%M_%S" -d "12 hours ago"
```


### pgrep

``` {.bash}
pgrep procname*
```

#### pkill and kill

``` {.bash}
pgrep procname* | xargs kill -9
```


### watch

``` {.bash}
while true;do date +"%Y-%m-%d %H:%M:%S.%N";sleep 1;done
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


## YUM

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





### ON/OFF REPO

``` {.bash}
yum --disablerepo=\* --enablerepo=c6-media ...
```


### package's dependencies

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

### INSTALL LOCAL RPM

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

