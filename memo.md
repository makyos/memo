<template id=varin>
<div class="form-group">
<label class="control-label col-xs-6">{{ label }}</label>
<div class="col-xs-6">
<input :id=label class="form-control" :value="value" v-on:input="onInput" onClick="this.select();"  type="text" />
</div>
</div>
</template>

<ul class="nav flex-column menu">
<li class="nav-item" v-for="title in titles">
<a class="nav-link active" v-bind:href="'#'+title.href">{{ title.title }}</a>
</li>
</ul>

# Rust

## Cargo

### create new bin

```{.bash}
cargo new --bin {binname}
cd {binname}
```

## cross compile

### win64

#### yum

```{.sh}
sudo yum install -y mingw64-gcc
sudo yum install -y mingw64-winpthreads-static
# ??? sudo yum install -y glibc-static
```

#### ~/.cargo/config

```{.sh}
[target.x86_64-pc-windows-gnu]
linker = "/usr/bin/x86_64-w64-mingw32-gcc"
```

#### ADD TARGET

```{.sh}
rustup target add x86_64-pc-windows-gnu
```

#### BUILD

```{.sh}
cargo build --target x86_64-pc-windows-gnu
```



# Appium

## Windows Application Driver

### Install

```{.sh}
msiexec /i WindowsApplicationDriver.msi /q
setx /M PATH "%PATH%;C:\Program Files (x86)\Windows Application Driver"
```

### Run

Settings > Update & Security > For Developers

#### New Prompt

```{.sh}
WinAppDriver.exe
```

## Appium-Python-Client

### Install


```{.sh}
python-3.6.2-amd64.exe /install /quiet
setx /M PATH "%PATH%;C:\Users\IEUser\AppData\Local\Programs\Python\Python36\Scripts\"
setx /M PATH "%PATH%;C:\Users\IEUser\AppData\Local\Programs\Python\Python36\"
```

#### New Prompt

```{.sh}
pip install Appium-Python-Client
```

## TEST

### notepad.exe

```{.py}
import unittest
from appium import webdriver
from selenium.webdriver.common.keys import Keys


class NotepadTests(unittest.TestCase):

    def setUp(self):
        desired_caps = {}
        desired_caps["app"] = "C:\\Windows\\System32\\notepad.exe"
        self.driver = webdriver.Remote(command_executor='http://127.0.0.1:4723', desired_capabilities=desired_caps)
        self.driver.find_element_by_name('Maximize').click()

    def tearDown(self):
        self.driver.quit()

    def test_01_01_01_helpmenu(self):
        self.driver.find_element_by_name("Help").click()
        self.driver.find_element_by_name("About Notepad").click()
        self.driver.save_screenshot("evi/about.png")
        self.driver.find_element_by_name("OK").click()

    def test_01_02_01_textinput(self):
        inputdata = 'hello automation'
        self.driver.find_element_by_name('Text Editor').send_keys(inputdata)
        self.driver.save_screenshot("evi/type.png")
        result = str(self.driver.find_element_by_name('Text Editor').get_attribute('Value.Value'))
        self.driver.find_element_by_name('Text Editor').clear()
        self.assertEqual(result, inputdata)


if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(NotepadTests)
    unittest.TextTestRunner(verbosity=2).run(suite)
```


# selenium

## install

### selenium

```{.sh}
# pip
sudo apt-get install python-pip
# selenium
sudo pip install selenium
```

### WebDriver

ブラウザごとに実行環境に合うものをダウンロードして、$PATH にコピーする。


## hello world

```{.py}
#!/usr/bin/env python

from selenium import webdriver

browser = webdriver.Firefox()
browser.get('http://www.ubuntu.com/')
```


# CLAMAV

## hand scan

```{.sh}
sudo clamscan --infected --remove --recursive ./
```

# vSRX

```{.sh}
vagrant plugin install vagrant-junos
vagrant plugin install vagrant-host-shell
```

ffi のコンパイルがどうのと出たら

```{.sh}
sudo apt-get install ruby-dev
```

#### Vagrantfile

```{.ruby}
# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|
  config.vm.box = "juniper/vqfx10k-re"
  config.vm.box_check_update = false
  config.ssh.insert_key = false
end
```







# RAID

<script>window.addEventListener('load', function () {
new Vue({el:'#app-raid',data:{label:''
,hdd1: '/dev/sdd'
,hdd2: '/dev/sde'
,mdx:  '/dev/md1'
}});})</script>

<div id="app-raid">
<form class="form-horizontal">
<varin label="HDD-1"  v-model="hdd1"></varin>
<varin label="HDD-2"  v-model="hdd2"></varin>
<varin label="md no." v-model="mdx"></varin>
</form>

## HDD SETUP

### parted

#### {{hdd1}}

```{.sh}
parted -s {{hdd1}} "mklabel gpt"
parted -s {{hdd1}} "mkpart primary 0% 100%"
parted -s {{hdd1}} "set 1 raid on"
```

#### {{hdd2}}

```{.sh}
parted -s {{hdd2}} "mklabel gpt"
parted -s {{hdd2}} "mkpart primary 0% 100%"
parted -s {{hdd2}} "set 1 raid on"
```


## MAKE RAID

#### RAID-1

```{.sh}
mdadm --create {{mdx}} --level=raid1 --raid-devices=2 {{hdd1}} {{hdd2}}
```

[y], [RET]

## CHECK

```{.sh}
watch -d -n 2 cat /proc/mdstat
```

[UU] is OK

</div>


# VueComponent

<script>window.addEventListener('load', function () {
new Vue({el:'#app1',data:{label:''
,input1: '$input1'
,input2: '$input2'
}});})</script>

<div id="app1">
<form class="form-horizontal">
<varin label="input1" v-model="input1"></varin>
<varin label="input2" v-model="input2"></varin>
</form>

## h2

```
L1 is {{ input1 }}
L2 is {{ input2 }}
```

</div>


# Checksum

<script>window.addEventListener('load', function () {
new Vue({el:'#Checksum', data: {label:''
,filename:'$FILENAME'
}});})</script>

<div id='Checksum'>
<form class="form-horizontal">
<varin label="TARGET FILE NAME" v-model="filename"></varin>
</form>

#### on Windows

Apprication Control に手動追加するときに必要。

```{.bash}
certutil -hashfile {{ filename }} SHA1
```

#### on Linux

```{.bash}
md5sum {{ filename }}
```

</div>

# neo4j

```{.sql}
create (a_san:Person { name:"Aさん", 所属:"開発部"})
create (b_san:Person { name:"Bさん", 所属:"経理部"})

create (a_san)-[r:知ってる]->(b_san)

match (a_san:Person),(b_san:Person)
where a_san.name="Aさん" and b_san.name="Bさん"
create (a_san)-[r:知ってる]->(b_san)
return r;
```



## misk

いらんイメージ消して、docker 再起動したらいけた。謎。

```
ERROR: for neo4j  Cannot start service neo4j: oci runtime error: process_linux.go:330: running prestart hook 0 caused "fork/exec /usr/bin/dockerd (deleted): no such file or directory: "
```



# hecate

```{.bash}
go get -u github.com/evanmiller/hecate
```




# POSTGRES

## CLIENT

### CONNECT

```{.bash}
psql -h {PG_SRV_ADDRESS} -U {PG_USER}
```

## Database

### list

```{.sql}
\l
```

### Connect

```{.sql}
\c {TABLENAME}
```


## Table

### list

```{.sql}
\dt
```

```{.sql}
select table_name from INFORMATION_SCHEMA.tables;
```

## View

### list

```{.sql}
\dv
```

```{.sql}
select table_name from INFORMATION_SCHEMA.views;
```

## Column List

```{.sql}
\d {TABLENAME}
```



## Batch File

```{.sql}
\i {FILENAME.sql}
```

## Log

#### /var/lib/postgresql/data

```{.sh}
log_statement = 'all'
```




# SYSLOG

```{.bash}
{COMMAND} 2>&1 | tee >(logger -i -t "{TAG}")
```

# Load

## CPU

```{.bash}
yes > /dev/null
```

## DISK

```{.bash}
while true; do dd if=/dev/zero of=./tmpfile bs=1M count=1000; done; rm ./tmpfile
```


# MOZC

よくわからんが日本語入力できなくなったとき。

```{.bash}
/usr/lib/mozc/mozc_renderer &
```

# ufw

## BASICS

デフォルトは無効 (ubuntu server 16.10) 。

有効化すると下記の状態となるため、クライアント運用は可能。

 * deny (incoming) --- 入力 NG
 * allow (outgoing) --- 出力 OK
 * disabled (routed) --- 転送 NG


### su

```{.bash}
sudo su -
```

### Display STATUS

```{.bash}
ufw status verbose
```

### ENABLE/DISABLE

```{.bash}
ufw enable
```

```{.bash}
ufw disable
```



# XMONAD

## MOD Key Change

#### .xmonad

MOD to [WINDOWS]

```{.hs}
modMask = myModMask
```

#### .Xmodmap

```
! [caps]=[Windows] に
clear Lock
keycode  66 = Super_L
```

```{.bash}
xmodmap -e "clear Lock"
xmodmap -e "keycode  66 = Super_L"
```

#### .xinitrc

```
xmodmap $HOME/.Xmodmap
```



## dmenu(ランチャ)

### install & run

```{.bash}
sudo apt-get search dmenu
```

MOD + [P]


## 設定更新

```{.bash}
xmonad --recompile && xmonad --restart
```

## キーバインド

キーバインド                 働き
------------------------   -----------------------------------
MOD + SHIFT + RET          新しいタイルにターミナルを開く
MOD + [J]/[K]              タイルフォーカスを移動
MOD + SHIFT + [J]/[K]      フォーカスタイルと隣接タイルと入れ替える
MOD + [1]/.../[9]          仮想デスクトップを切り替える
MOD + SPC                  タイルのレイアウト方法を切り替える



# github

## COMMAND GRAPH

<div id="gitgraph" style="width: 100%; height: 300px; border: 1px solid lightgray;">
  <div id="graph-navigation_wrapper" style="position: absolute; width: 100%; height: 300px;">
    <div id="graph-navigation_zoomExtends" class="graph-navigation zoomExtends">
    </div>
  </div>
  <div class="graph-frame" style="position: relative; overflow: hidden; width: 100%; height: 100%;">
    <canvas style="position: relative; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); width: 100%; height: 100%"></canvas>
  </div>
</div>

<script type="text/javascript">
var gitcontainer = document.getElementById('gitgraph');
var gitdata = {dot: 'digraph { \
\
WORKING  [shape=box,   fontColor=black,color=orange]; \
STAGING  [shape=box,   fontColor=white,color=blue]; \
LOCAL    [shape=box,   fontColor=white,color=red]; \
REMORT   [shape=box,   fontColor=white,color=red]; \
\
WORKING -> ADD          -> STAGING ; \
STAGING -> COMMIT       -> LOCAL   ; \
LOCAL   -> PUSH         -> REMORT  ; \
LOCAL   -> RESET_COMMIT -> WORKING ; \
REMORT  -> FETCH        -> LOCAL   ; \
REMORT  -> PULL         -> LOCAL   ; \
           PULL         -> WORKING ; \
\
}'};
var gitgraph = new vis.Graph(gitcontainer, gitdata);
</script>





## 公開鍵を登録

テスト
```{.bash}
ssh -T git@github.com
Hi {USERNAME}! You've successfully authenticated, but GitHub does not provide shell access.
```

## remote URL を変更

変更方法

```{.bash}
git remote set-url origin git@github.com:{USER}:{REPOS.}
```


確認方法

```
git remote -v
```

## remote との比較

```{.bash}
git fetch origin && git diff origin/master
```

## マスター競合(PULL忘れ)

単純マージ

```{.bash}
git fetch && git merge origin/master
```

## 最終コミットまで戻す

```{.sh}
git reset --hard HEAD
```




# ntp

### 同期状況

```{.bash}
/usr/sbin/ntpq -p
```

```
     remote           refid      st t when poll reach   delay   offset  jitter
==============================================================================
*196.2.33.10     LOCAL(0)         6 u  503 1024  377    1.656   -0.089   0.048
 196.2.34.10     .INIT.          16 u    - 1024    0    0.000    0.000   0.000
 196.3.33.10     .INIT.          16 u    - 1024    0    0.000    0.000   0.000
 196.3.34.10     .INIT.          16 u    - 1024    0    0.000    0.000   0.000
```

#### Windows

管理者コマンド

```{.bash}
w32tm /query /peers
```


### 強制同期

```{.bash}
sudo service ntpd restart
```

#### Windows

管理者コマンド

```{.bash}
w32tm /resync /nowait
```


### Windows

gpedit.msc で以下を実施

* ntp クライアントの有効化
* ntp サーバの設定(192.168.0.1,0x1)

service.msc の Windows Time で以下を実施

* (再)起動
* 自動起動

# CentreCOM SH210(x210)

## PORT SHUTDOWN

```{.bash}
show interface status
enable
configure terminal
interface port1.0.8
shutdown
exit
exit
write file
show interface status
```



## 状況表示

### RUNNING-CONFIG

```{.bash}
enable
show running-config
```

### MAC ADDRESS Filter

???

```{.bash}
mac address-table static
```


### ポートの状態

```{.bash}
show interface status
```

表示例

```{.bash}
Port       Name               Status            Vlan Duplex   Speed Type
port1.0.1                     connected            1 a-full  a-1000 1000BASE-T
port1.0.2                     connected            1 a-full  a-1000 1000BASE-T
port1.0.3                     notconnect           1 auto      auto 1000BASE-T
port1.0.4                     connected            1 a-full  a-1000 1000BASE-T
port1.0.5                     notconnect           1 auto      auto 1000BASE-T
port1.0.6                     connected            1 a-full   a-100 1000BASE-T
port1.0.7                     connected            1 a-full  a-1000 1000BASE-T
port1.0.8                     connected            1 a-full  a-1000 1000BASE-T
port1.0.9                     notconnect           1 auto      auto not present
```

## 基本設定(IP接続可能化)

### RS-232C 接続

USB to Serial ケーブルで接続、ドライバをインストールする。

### IP ADDR 設定

各モード(階層)プロンプト

```{.bash}
>
	#
		(config)#
			(config-if)#
```

```{.bash}
enable
	configure terminal
		interface vlan1
			ip address 192.168.10.254/24

		ip route 0.0.0.0/0 192.168.10.1

	write file
```



### SSH(+SFTP) の有効化

```{.bash}
>
	#
		(config)#
			(config-if)#
```

```{.bash}
awplus> enable

awplus# configure terminal
Enter configuration commands, one per line.  End with CNTL/Z.

awplus(config)#crypto key generate hostkey dsa

Generating host key (1024 bits dsa)
This may take a while. Please wait ... Done

WARNING: The SSH server must now be enabled with "service ssh"

awplus(config)# crypto key generate hostkey rsa

Generating host key (1024 bits rsa)
This may take a while. Please wait ... Done

WARNING: The SSH server must now be enabled with "service ssh"

awplus(config)# crypto key generate hostkey rsa1

Generating host key (1024 bits rsa1)
This may take a while. Please wait ... Done

WARNING: The SSH server must now be enabled with "service ssh"

awplus(config)# ssh server allow-users *
awplus(config)# ssh server session-timeout 3600
awplus(config)# service ssh
awplus(config)# ^D
awplus# write file

Building configuration...
[OK]
```

### ポート速度設定



```{.bash}
awplus> enable
awplus# configure terminal
awplus(config)# interface port1.0.1
awplus(config-if)# speed 10
awplus(config-if)# duplex full
```



# Visual Studio Code

## GNOME

マルチカーソル(Alt)が効かない場合

```{.bash}
gsettings set org.gnome.desktop.wm.preferences mouse-button-modifier "<Super>"
```


## 基本操作

### コマンドラインから起動

```{.bash}
code .
```

### コマンドパレットの呼出し

----- ----------------------
 通常  Command + P
 拡張  Command + Shift + P
----- ----------------------

## エディタ操作

### カーソル移動

to top,bottom: Command + UP, DOWN

## 英語モード

 * コマンドまで日本語...
 * メニューバーに(F)...

### locale.json を開く

```
>言語を構成する
```

### 内容を以下にする

```{.bash}
"locale":"en-US"
```

### 再起動する

# Handsontable

## CSS

### SHADOW

#### handsontable-master/src/css/handsontable.css

```{.css}
.handsontable .handsontable table {
  -webkit-box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
}
```




# NETWORK MANAGER

## CONNECTION

### ADD

```{.bash}
nmcli connection add \
      type ethernet \
      ifname eno1 \
      con-name eno1-1 \
      autoconnect yes \
      save yes \
      ip4 "10.0.0.10/24" \
      gw4 "0.0.0.0"

nmcli connection mod ipv4.method manual ipv4.addresses "192.168.0.100/24"
```

### DEL

```{.bash}
nmcli connection delete eno1-1
```



# selinux

## OFF

```{.bash}
echo 'SELINUX=disabled' > /etc/selinux/config
```

```{.bash}
reboot
```



# LL BASICS

## REPL

PYTHON  RUBY  JAVASCRIPT
------- ----  ----------
python  irb   node


## LIB

### INCLUDE

#### python


```{.python}
sys.path.append(os.path.join(os.path.dirname(__file__),'{{LIBDIR}}'))
```



## LIST(ARRAY)

### JOIN

#### PYTHON

```{.python}
''.join(['a','b'])  # ab
','.join(['a','b']) # a,b
```

#### RUBY

```{.ruby}
['a','b'].join('')  # ab
['a','b'].join(',') # a,b
```

#### JAVASCRIPT

```{.javascript}
['a','b'].join('')  // ab
['a','b'].join(',') // a,b
```


### REVERSE

#### PYTHON

```{.python}
['a','b'][::-1] # ['b', 'a']
```



## DATE

### SERIAL(INT) to STR

#### PYTHON

``` {.python}
import time
time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(963920001)) # '2000-07-18 12:33:21'
time.strftime("%Y-%m-%d %H:%M:%S",time.gmtime(963920001))    # '2000-07-18 11:33:21'
```


# BASH

## STR CUT

```{.bash}
a=ABC
echo ${a:1:1} # B
```


## history

### add time

```{.bash}
HISTTIMEFORMAT='%Y-%m-%d %T '
```

## brace expansion

### add seq

```{.bash}
echo A-{{1..3},5}  # A-1 A-2 A-3 A-5
echo A-{a..c}      # A-a A-b A-c
```

### cp + date

```{.bash}
cp filename{,`date +'__%Y-%m-%d_%H-%M-%S'`}.tgz
# cp filename.tgz filename__2015-01-23_23-05-58.tgz
```



# VIRTUAL BOX

## DISK

### create shareable

```{.bash}
vboxmanage createhd --size 1000 --variant Fixed --filename disk1.vdi
vboxmanage modifyhd --type shareable disk1.vdi
```

## Serial Port

### Linux Host & Win Guest

#### Linux(Host)

```{.bash}
su
chmod 666 /dev/ttyS0
ll /dev/ttyS0
crw-rw-rw- 1 root dialout 4, 64  1月 21 20:12 2015 ttyS0
```

この設定は再起動時にリセットされる。
恒久的に使う場合は、/etc/udev/... に、...

#### Win(VBox Guest Setting:Serial Port)

 * [ON] "Serial Port Enable"
 * COM1
 * Host Device
 * [OFF] "Make PIPE"
 * /dev/ttyS0



# Allied Telesis CentreCOM

## Conn to Serial Port

### Serial Port Settings

sets      val
--------- -----
bit/sec   9600
data bit  8
parity    none
stop bit  1
flow cont none

### User/Password

manager/friend

### ADD IP

```{.bash}
add ip IPADDRESS=202.46.51.254 MASK=255.255.255.0 GATEWAY=0.0.0.0
```

```{.bash}
show ip

IP Address Information
--------------------------------------------
 Type ....................... Static
 Interface .................. default
 IP address ................. 202.46.51.254
 Subnet mask ................ 255.255.255.0
 Gateway address ............ 0.0.0.0
 MTU ........................ 1500
 DHCP Client ................ Disabled
 Directed broadcast ......... No
--------------------------------------------
```

### ENable Http server

```{.bash}
ENable Http server
```

```{.bash}
SHow Http server
```

```{.bash}
HTTP Server Module Configuration:
--------------------------------------
Status                     : Enabled
HTTP Server Listen Port    : 80
--------------------------------------
```

### ENable Telnet server

```{.bash}
ENable TELnet server
```

```{.bash}
SHow TElnet
```

```{.bash}
TELNET Module Configuration:
--------------------------------------
 TELNET Server             : Enabled
 TELNET Server Listen Port : 23
 TELNET Connection Limit   : 4
--------------------------------------
```






# FDISK

## LIST ALL

```{.bash}
fdisk -l
```

## PART

```{.bash}
fdisk /dev/sdb
```


 * p: 領域テーブルを表示する
 * n: 新規
 * p: 基本パーティション
 * 1: パーティション番号
 * RET,RET
 * p: 領域テーブルを表示する
 * w: テーブルをディスクに書き込み、終了する

## FORMAT(make filesystem)

```{.bash}
mke2fs /dev/sdb1
```


# DD

## MAKE DUMMYFILE

```{.bash}
dd if=/dev/zero of=./dummyfile bs=100M count=1
ls -l ./dummyfile
```

# SYSTEMD

## SERVICE

### FILES

#### /usr/lib/systemd/cp.path

```{.bash}
[Unit]
Description=systemdtest

[Path]
PathChanged=/home/vagrant/target1.txt

[Install]
WantedBy=multi-user.target
```

#### /usr/lib/systemd/cp.service

下の2行がないと、enableでなんかゆわれる

```{.bash}
[Unit]
Description=Copy file

[Service]
Type=oneshot
ExecStart=/usr/bin/cp -f /home/vagrant/target1.txt /home/vagrant/target2.txt

[Install]
WantedBy=multi-user.target
```



### INSTALL

```{.bash}
sudo ln -s /etc/systemd/system/cp.path    /etc/systemd/system/multi-user.target.wants/
sudo ln -s /etc/systemd/system/cp.service /etc/systemd/system/multi-user.target.wants/
```

### ENABLE

```{.bash}
sudo systemctl enable cp.path
sudo systemctl enable cp.service
```

### START

```{.bash}
sudo systemctl start cp.path
sudo systemctl start cp.service
```

### STATUS

```{.bash}
systemctl status cp.path
systemctl status cp.service
```

## RELOAD

```{.bash}
sudo systemctl --system daemon-reload
```

# ICONV

 * Windows SJIS は、 SHIFT_JISX0213 とすべし。
 * Windows UTF-8 は BOM 付き。
 * -c でエラーストップしなくなる。

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

## BOM delete

``` {.bash}
tail --bytes=+4 index.unix.txt
```


## 一括処理

### カレントディレクトリ以下

``` {.bash}
find -type f | xargs file | grep ":.*text" | cut -d : -f1 | xargs -t -I{} iconv -f EUC-JP -t UTF-8 {} -o {}.utf8
```

# AWK

## COL COMPLETE

```{.bash}
{
  echo '100 abc'
  echo 'bcd'
  echo '200 def'
} > file.txt
cat file.txt
cat file.txt | awk 'm=match($0,/^[0-9]+\ /){print $0;n=substr($0,RSTART,RLENGTH)};!m{print n $0}'
rm file.txt
```


# TAR

## LS

```{.bash}
tar zft AAA.tgz
```


## MATOME

```{.bash}
for f in ./*.tgz ; do tar zxvf $f ; done
```


# NETSTAT

## OPTION

```{.bash}
netstat  --inet -aenop
```

 * --inet: inet protocol
 * a: all status
 * e: extend(User&Inode)
 * n: numeric
 * o: timers
 * p: pid,program


## STATE

### from man

NAME        WHAT
----------- --------------------------------------------------------------------------------------------------------------------------------------------------
ESTABLISHED ソケットは確立した接続状態にある。
SYN_SENT    ソケットは接続を確立しようと試みている。
SYN_RECV    接続要求をネットワークから受信している。
FIN_WAIT1   ソケットはクローズされており、接続は切断中である。
FIN_WAIT2   接続はクローズされ、ソケットはリモート側からの切断を待っている。
TIME_WAIT   ソケットは、クローズ後にリモートからの切断が再送されるのを待っている。
CLOSED      ソケットは使用されていない。
CLOSE_WAIT  リモート側は既に切断され、ソケットがクローズされるのを待っている。
LAST_ACK    リモート側は既に切断され、ソケットもクローズされている。 確認 (acknowledgement) を待っている。
LISTEN      ソケットは接続待ち (listen) である。このようなソケットは、--listening (-l) または --all (-a) オプションを指定しない限り、出力には含まれない。
CLOSING     両方のソケットが切断されているが、まだ全てのデータが送られていない。
UNKNOWN     ソケットの状態は不明である。



# Mac OS X

## NETWORK

### LISTEN PORT

```{.bash}
lsof -nP -iTCP -sTCP:LISTEN
```

# YEOMAN

homebrew で入れてる場合は sudo 無し

can not load module は npm update -g

パーミッションぽいのは chmod -R `whoami` ~/.npm


## setup

```{.bash}
npm install -g yo grunt grunt-cli bower
```

## generator

### search

[http://yeoman.io/generators/](http://yeoman.io/generators/)

### install

```{.bash}
npm install -g generator-webapp
```

## generate WEBAPP

```{.bash}
mkdir WEBAPPDIR && cd WEBAPPDIR
yo webapp
```

## exec WEBAPP

```{.bash}
grunt server
```

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

### STRING

```{.bash}
a=aaa
[ $a == 'aaa' ] ; echo $?  # 0
[ $a != 'aaa' ] ; echo $?  # 1
```


# ELASTIC SEARCH

<script>window.addEventListener('load', function () {
new Vue({el:'#vesearch',data:{label:'',
host:'localhost:9200',
index:'myindex',
type:'mytype'
}});})</script>

<div id="vesearch">
<form class="form-horizontal">
<varin label="SERVICE HOST:PORT" v-model="host"></varin>
<varin label="INDEX NAME"        v-model="index"></varin>
<varin label="TYPE NAME"         v-model="type"></varin>
</form>


## Setup

#### ubuntu

```{.bash}
sysctl vm.max_map_count
sudo sysctl -w vm.max_map_count=262144
sysctl vm.max_map_count
```


## Metricbeat

### Start

#### ubuntu

```{.bash}
sudo ./metricbeat -e -c metricbeat.yml
```

#### macOS

```{.bash}
sudo ./metricbeat -e -c metricbeat.yml -d "publish"
```

### Template?

```{.bash}
curl -XPUT 'http://{{ host }}/_template/metricbeat' -d@/etc/metricbeat/metricbeat.template.json
```

### Kibana

#### Discover Index

```
metricbeat-*
```

#### Create Dushbord

#### tar.gz

```{.bash}
./scripts/import_dashboards
```

#### deb
```{.bash}
/usr/share/metricbeat/scripts
```


## INDEX

### List

```{.bash}
curl -XGET {{ host }}/_aliases?pretty
```

### create

``` {.bash}
curl -XPUT 'http://{{ host }}/{{ index }}'
```

### look

``` {.bash}
curl -XGET 'http://{{ host }}/{{ index }}?pretty=true'
```

### delete

``` {.bash}
curl -XDELETE 'http://{{ host }}/{{ index }}'
```


## TYPE

### create

``` {.bash}
curl -XPUT 'http://{{ host }}/{{ index }}/{{ type }}/_mapping'  -d @{{ type }}.json
```

#### {{ type }}.json

``` {.json}
{
    "{{ type }}":{
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
curl -XGET 'http://{{ host }}/{{ index }}/{{ type }}/_mapping?pretty=true'
```

### delete

``` {.bash}
curl -XGET 'http://{{ host }}/{{ index }}/{{ type }}'
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
curl -XPOST 'http://{{ host }}/{{ index }}/{{ type }}/_bulk' --data-binary @IMPORTDATAFILE.json  > /dev/null
```


### LAERGE SIZE(SPLIT)

``` {.bash}
split IMPORTDATAFILE.json -l 100000
time for f in x??; do curl -XPOST 'http://{{ host }}/{{ index }}/{{ type }}/_bulk' --data-binary @$f > /dev/null; done
rm -f x??
```


## SEARCH

``` {.bash}
curl -XGET 'http://{{ host }}/{{ index }}/{{ type }}/_search'
```

</div>



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

## on Screen

``` {.bash}
sudo tcpdump -Xs 256 -n -i eth1 dst port 50012
```

## to File

``` {.bash}
sudo tcpdump -G 3600 -w ./eno1_YYYYMM%d_%HMISS.pcap -z gzip -i eth0
```

-G [sec] が無いと、ファイル名の %. が動かない


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

## HTTPD

``` {.bash}
python -m SimpleHTTPServer 12345
```

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
perl -pe 's/\r//' Win.txt > UNIX.txt
```

``` {.bash}
nkf -Lu AAA.txt
```

#### from UNIX

``` {.bash}
perl -pe 's/\n/\r\n/' UNIX.txt > Win.txt
```


# WGET

## FTP

### FTP GET

<script>window.addEventListener('load', function () {
new Vue({el:'#vwgetftp',data:{label:''
,ftpserver : 'ftpserver'
,ftpuser   : 'user'
,ftppass   : 'passwd'
,fname     : 'getfilename'
}});})</script>

<div id="vwgetftp">
<form class="form-horizontal">
<varin label="ftp server" v-model="ftpserver"></varin>
<varin label="ftp user" v-model="ftpuser"></varin>
<varin label="ftp pass" v-model="ftppass"></varin>
<varin label="file name" v-model="fname"></varin>
</form>


``` {.bash}
wget --ftp-user={{ftpuser}} --ftp-password={{ftppass}} ftp://{{ftpserver}}/{{fname}}
```

</div>

# SQLITE3

<script>window.addEventListener('load', function () {
new Vue({el:'#vsqlite',data:{label:''
,SQLITE_DB_NAME : 'MYDB'
,SQLITE_TAB_NAME: 'MYTAB'
,SQLITE_SQL_FILE: 'MYFILE'
}});})</script>

<div id="vsqlite">
<form class="form-horizontal">
<varin label="DATABASE NAME" v-model="SQLITE_DB_NAME"></varin>
<varin label="TABLE NAME" v-model="SQLITE_TAB_NAME"></varin>
<varin label="SQL-FILE NAME" v-model="SQLITE_SQL_FILE"></varin>
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

</div>


# EMACS

### REPLACE & CR

M-% するときに、C-q C-j で改行挿入


### RECT

 key       move
--------- ------------------
 C-x r k   矩形領域カット
 C-x r y   矩形領域ペースト

### PACKEAGE

M-x packeage-list-packeage



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

<script>window.addEventListener('load', function () {
new Vue({el:'#app-diskimage',data:{label:''
,ISO_FILEPATH: 'medianame.iso'
,ISO_MOUNTPOINT: '/mnt/dvd'
}});})</script>

<div id="app-diskimage">
<form class="form-horizontal">
<varin label="ISO FILE NAME" v-model="ISO_FILEPATH"></varin>
<varin label="MOUNT POINT" v-model="ISO_MOUNTPOINT"></varin>
</form>

#### ISO to DVD

``` {.bash}
growisofs -dvd-compat -Z /dev/dvdrw={{ISO_FILEPATH}}
```

#### dir to iso

``` {.bash}
genisoimage -allow-limited-size -o DIRNAME.iso DIRNAME
```


#### DISC to ISO FILE

``` {.bash}
dd if=/dev/sr0 of={{ISO_FILEPATH}}
```

#### MOUNT ISO FILE

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

</div>


## LOCK TRAY?

VirtualBox やらの VM が邪魔してる場合あり。とめよ。


## MAKE SWAP

### on FILE

<script>window.addEventListener('load', function () {
new Vue({el:'#app-make-swap',data:{label:''
,LINUX_SWAP_FILE: '/swapfile'
}});})</script>

<div id="app-make-swap">
<form class="form-horizontal">
<varin label="FILE NAME" v-model="LINUX_SWAP_FILE"></varin>
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

</div>


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

## Config

Triger(Ctr+[b]...)            Action
----------------------------  -------------
:source-file ~/.tmux.conf      設定反映


## Session

プロジェクト単位に作成、アタッチする。

```{.bash}
## 一覧表示
tmux ls
## 作成
tmux new -s <session>
## 削除（個別）
tmux kill-session -t <session>
## 削除（全て）
tmux kill-server
```

## Pane

ウインドウを分割する。

Triger(Ctr+[b]...)                         Action
-----------------------------------------  -------------
"                                          上下に分割
%                                          左右に分割
o                                          Pane を移動
[SPC]                                      レイアウト切り替え
[Ctr]+[カーソル]                           サイズ変更
:set-window-option synchronize-panes on    各 Pain にキー入力をブロードキャストする
:set-window-option synchronize-panes off   各 Pain にキー入力をブロードキャストしない



# GIT

<script>window.addEventListener('load', function () {
new Vue({el:'#app-git',data:{label:''
,GIT_REPONAME: 'dir/name.git'
,GIT_ROOT    : '/var/lib/git'
,GIT_REMOTE  : '192.168.0.10'
,GIT_USER    : 'git'
,GIT_SSH     : '2203'
,GIT_COMMENT : 'テスト'
}});})</script>

<div id="app-git">
<form class="form-horizontal">
<varin label="REPO NAME" v-model="GIT_REPONAME"></varin>
<varin label="ROOT" v-model="GIT_ROOT"></varin>
<varin label="REMOTE" v-model="GIT_REMOTE"></varin>
<varin label="USER" v-model="GIT_USER"></varin>
<varin label="SSH" v-model="GIT_SSH"></varin>
<varin label="COMMIT -m" v-model="GIT_COMMENT"></varin>
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

</div>




# DOCKER

## Setup

### Install

```{.bash}
brew cask install docker
```

### WITHOUT sudo

```{.bash}
# sudo groupadd docker
sudo gpasswd -a ${USER} docker
sudo service docker restart
```

最ログインが必要！


### Hello World

```{.bash}
docker run hello-world
```

## docker-compose

#### docker-compose.yml

```{.yaml}
centos:
  image: centos:latest
  container_name: centos7
  entrypoint: tail -f /dev/null
```

### UP/DOWN

```{.bash}
docker-compose up
```

```{.bash}
docker-compose down
```

## CONTAINER

### LIST

```{.bash}
docker ps -a
```

### RUN & STOP

```{.bash}
docker run -d -p 80:80 --name web nginx
```

``` {.bash}
docker stop {CONTAINER}
```

### REMOVE

``` {.bash}
docker rm {CONTAINER}
```

### CONNECT

``` {.bash}
docker exec -it {CONTAINER} /bin/bash
```

## IMAGE

### LIST

```{.bash}
docker images
```

### REMOVE

``` {.bash}
docker rmi {IMAGE}
```

```{.bash}
docker rmi $(docker images -a | awk '/^<none>/ { print $3 }')
```

# Docker.OLD

### install

``` {.bash}
yum install -y docker-io.x86_64
```

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

<script>window.addEventListener('load', function () {
new Vue({el:'#app-docker',data:{label:''
,DOCKER_TARG_REPO: 'ubuntu'
,DOCKER_TARG_TAG: 'ruby2'
,DOCKER_IMAGE_ID: '${IMAGE_ID}'
,DOCKER_CONTAINER_ID: '${CONTAINER_ID}'
}});})</script>

<div id="app-docker">
<form class="form-horizontal">
<varin label="REPO"         v-model="DOCKER_TARG_REPO"></varin>
<varin label="TAG"          v-model="DOCKER_TARG_TAG"></varin>
<varin label="IMAGE ID"     v-model="DOCKER_IMAGE_ID"></varin>
<varin label="CONTAINER ID" v-model="DOCKER_CONTAINER_ID"></varin>
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

</div>


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

# cut

## 1列目だけ

```
cut -d ' ' -f1
```


# grep

## AND

``` {.bash}
grep 'AAA' | grep 'BBB'
```

``` {.bash}
grep 'AAA.*BBB'
```

### 複数行

``` {.bash}
grep -P 'AAA[\s\S]*?BBB'
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

## 改行コード変換

``` {.bash}
sed "s/\r//g" FILENAME.txt
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




# ファイルの内容置換

<script>window.addEventListener('load', function () {
new Vue({el:'#app-cmdreplace',data:{label:''
,CMD_REPLACE_BEFOR    : 'BEFOR'
,CMD_REPLACE_AFTER    : 'AFTER'
,CMD_REPLACE_FILENAME : '*.html'
}});})</script>

<div id="app-cmdreplace">
<form class="form-horizontal">
<varin label="BEFOR" v-model="CMD_REPLACE_BEFOR"></varin>
<varin label="AFTER" v-model="CMD_REPLACE_AFTER"></varin>
<varin label="FILE"  v-model="CMD_REPLACE_FILENAME"></varin>
</form>


``` {.bash}
grep -rl "{{CMD_REPLACE_BEFOR}}" */{{CMD_REPLACE_FILENAME}}
perl -p -i.befor -e 's/{{CMD_REPLACE_BEFOR}}/{{CMD_REPLACE_AFTER}}/g' {{CMD_REPLACE_FILENAME}}
```

OR

``` {.bash}
find . -name '{{CMD_REPLACE_FILENAME}}' -type f -exec sed -i 's/{{CMD_REPLACE_BEFOR}}/{{CMD_REPLACE_AFTER}}/g' {} \;
```

</div>



# date


## 設定

``` {.bash}
date --set "2016/12/31 12:34:56"
```


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


<script>window.addEventListener('load', function () {
new Vue({el:'#app-fileandfile',data:{label:''
,CMD_FILE1    : 'CMD_FILE1'
,CMD_FILE2    : 'CMD_FILE2'
}});})</script>

<div id="app-fileandfile">
<form class="form-horizontal">
<varin label="FILE-1" v-model="CMD_FILE1"></varin>
<varin label="FILE-2" v-model="CMD_FILE2"></varin>
</form>

### ナイスな diff

``` {.bash}
diff -y --suppress-common-lines {{CMD_FILE1}} {{CMD_FILE2}}
```

### ファイルの単純横結合

``` {.bash}
paste  {{CMD_FILE1}} {{CMD_FILE2}}
```

</div>

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

 key           move
-------------- -----
 1G            1 行目のあたま
 G             最終行のケツ
 ~             今の行のあたま
 $             今の行のケツ
 [CTR]+[b]     ページアップ
 [CTR]+[f]     ページダウン

# WINDOWS

## DISK WIPE



```
cipher /w:c:
```


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

### DNS

#### display

```
ipconfig /displaydns
```

#### flush

```
ipconfig /flushdns
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

### ip masquerade

```
configure terminal
   interface ethernet 1
      ip masquerade
   exit
exit
save config
```



### Speed

```
configure terminal
   interface ethernet 1
      speed 10M-full
   exit
exit
save config
```

### ブリッジの設定方法

設定上は masquerade と共存が可能であるが、その場合 masquerade は機能しない（アドレス変換されない）。

```
configure terminal
   interface bridge 0
      ip address 192.168.10.1/24
      bridge port 1 ethernet 0
      bridge port 2 ethernet 1
   exit
exit
save config
```

### 1:1 NAT

<script>window.addEventListener('load', function () {
new Vue({el:'#app-nxr120-nat',data:{label:''
,nxr_e0ip    : '192.168.0.1'
,NXR_RIP    : '192.168.0.10'
,nxr_e1ip    : '11.22.33.1'
,nxr_vip    : '11.22.33.10'
}});})</script>

<div id="app-nxr120-nat">
<form class="form-horizontal">
<varin label="ethernet0 IP" v-model="nxr_e0ip"></varin>
<varin label="host IP"      v-model="NXR_RIP"></varin>
<varin label="ethernet1 IP" v-model="nxr_e1ip"></varin>
<varin label="host virtIP"  v-model="nxr_vip"></varin>
</form>

```{.sh}
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

</div>

### ip filter

```{.sh}
configure terminal

ip access-list eth0_in permit 192.2.58.221/32 192.2.58.220/32 tcp any 22
ip access-list eth0_in permit 192.2.58.221/32 192.2.58.220/32 tcp any 880
ip access-list eth0_in permit any any icmp
ip access-list eth0_in deny any any

ip access-list eth1_in permit any any tcp any any
ip access-list eth1_in permit 195.200.58.33/32 any tcp any 80
ip access-list eth1_in permit 195.200.58.33/32 any tcp any range 1024 65535
ip access-list eth1_in permit any any icmp
ip access-list eth1_in deny any any

ip access-list eth1_forward_in permit 195.200.58.33/32 any tcp any range 1024 65535
ip access-list eth1_forward_in permit any any tcp any range 80 81
ip access-list eth1_forward_in permit any any tcp any 8081
ip access-list eth1_forward_in permit any any tcp any 8084
ip access-list eth1_forward_in permit 196.2.58.221/32 any tcp any range 1024 65535
ip access-list eth1_forward_in permit any any tcp range 80 81 any
ip access-list eth1_forward_in permit any any tcp 8081 any
ip access-list eth1_forward_in permit any any tcp 8084 any
ip access-list eth1_forward_in permit 193.2.14.31/32 192.2.58.221/32 tcp any any
ip access-list eth1_forward_in permit 193.3.15.31/32 192.2.58.221/32 tcp any any
ip access-list eth1_forward_in permit 192.2.58.221/32 193.2.14.31/32 tcp any any
ip access-list eth1_forward_in permit 192.2.58.221/32 193.3.15.31/32 tcp any any
ip access-list eth1_forward_in permit any any icmp
ip access-list eth1_forward_in deny any any


interface ethernet 0
   ip access-group in eth0_in
exit

interface ethernet 1
   ip access-group in eth1_in
   ip access-group forward_in eth1_forward_in
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

<script>window.addEventListener('load', function () {
new Vue({el:'#app-eth',data:{label:''
,CENT_NET_IFNAME: 'eth0'
}});})</script>

<div id="app-eth">
<form class="form-horizontal">
<varin label="I/F NAME"  v-model="CENT_NET_IFNAME"></varin>
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

</div>

# YUM

<script>window.addEventListener('load', function () {
new Vue({el:'#app-yum',data:{label:''
,YUM_PKG: 'httpd'
,YUM_OPT: 'YUM_OPT="--disablerepo=\\* --enablerepo=c6-media"'
}});})</script>

<div id="app-yum">
<form class="form-horizontal">
<varin label="PKG NAME"  v-model="YUM_PKG"></varin>
<varin label="OPT"       v-model="YUM_OPT"></varin>
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

### CREATE LOCAL REPOS.

```{.bash}
#!/bin/bash

function download_yum {
    if [ ! -e ${YUMDIR}/repodata/repomd.xml ] ; then
	sudo yum install -y yum-plugin-downloadonly createrepo
	sudo yum install -y --downloadonly --downloaddir=${YUMDIR} ${YUMPKGS}
	sudo createrepo -v ${YUMDIR}
	sudo yum clean all
    fi
}

function mk_repofile {
    sudo chmod 777 /etc/yum.repos.d
    # sudo rm -f /etc/yum.repos.d/*
    REPOFILE=/etc/yum.repos.d/${REPONAME}.repo
    echo [${REPONAME}]             >  ${REPOFILE}
    echo gpgcheck=0                >> ${REPOFILE}
    echo name=${REPONAME}          >> ${REPOFILE}
    echo baseurl=file://${YUMDIR}/ >> ${REPOFILE}
    echo enabled=1                 >> ${REPOFILE}
    sudo chmod 755 /etc/yum.repos.d
    sudo yum clean all
}

function download_etc {
    for url in ${ETCFILES}; do
	savefile=${ETCDIR}/$(basename ${url})
	if [ ! -e ${savefile} ]; then
	    sudo curl ${url} -o ${savefile}
	fi
    done
}

function main {
    SHAREDDIR=/vagrant
    DOWNLOADDIR=${SHAREDDIR}/download

    REPONAME=localhost
    YUMDIR=${DOWNLOADDIR}/yum ; sudo mkdir -p ${YUMDIR}
    YUMPKGS="ansible git"

    ETCDIR=${DOWNLOADDIR}/etc ; sudo mkdir -p ${ETCDIR}
    ETCFILES="
http://dl.fedoraproject.org/pub/epel/RPM-GPG-KEY-EPEL-6
http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
"

    download_etc
    sudo rpm --import file://${ETCDIR}/RPM-GPG-KEY-EPEL-6
    sudo rpm -ihv file://${ETCDIR}/epel-release-6-8.noarch.rpm

    download_yum
    mk_repofile
    sudo yum install -y --disablerepo=* --enablerepo=${REPONAME} ${YUMPKGS}

}

main
```


</div>


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

<script>window.addEventListener('load', function () {
new Vue({el:'#app-vagrant',data:{label:''
,VAG_BOX_FILE: './package.box'
,VAG_BOX_NAME: 'centos65-x86_64-20131205'
,VAG_VM_NAME: 'vm1'
,VAG_VM_IP: 'VAG_VM_IP'
,VAG_SSH_PORT: 'VAG_SSH_PORT=\'2205\''
}});})</script>

<div id="app-vagrant">
<form class="form-horizontal">
<varin label="BOX FILE"     v-model="VAG_BOX_FILE"></varin>
<varin label="BOX NAME"     v-model="VAG_BOX_NAME"></varin>
<varin label="VM NAME"      v-model="VAG_VM_NAME"></varin>
<varin label="VM STATIC IP" v-model="VAG_VM_IP"></varin>
<varin label="VM SSH PORT"  v-model="VAG_SSH_PORT"></varin>
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
  config.ssh.insert_key = false

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

</div>

# ORACLE

## DATA PUMP

<script>window.addEventListener('load', function () {
new Vue({el:'#app-oradp',data:{label:''
,DP_SID: 'sid'
,DP_DMP: 'filename.dmp'
}});})</script>

<div id="app-oradp">
<form class="form-horizontal">
<varin label="SID"   v-model="DP_SID"></varin>
<varin label="FILENAME"  v-model="DP_DMP"></varin>
</form>

### EXPORT

```{.bash}
expdp \
    system/manager@{{DP_SID}} \
    dumpfile={{DP_DMP}} \
    full=Y \
    content=metadata_only \

    SCHEMAS \
    TABLES \
    STATUS=30 \
    dumpfile=dir_punp:{{DP_DMP}} \

```


DIR なければ、~oracle/admin/{{DP_SID}}/dpdump に落ちる


### IMPORT

```{.bash}
impdp \
    system/manager@{{DP_SID}} \
    dumpfile={{DP_SID}} \
    STATUS=30 \
    table_exists_action='TRUNCATE' \
    Parallel=2 \
    INCLUDE=SCHEMA:"KY,KX,REPADMIN,EQP,MNG"

    INCLUDE=SCHEMA:"='in('KY','KX','EQP','REPADMIN','MNG')'"


    FULL=N \

    sqlfile=kx.sql \
    directory=dir_punp \
    EXCLUDE=SCHEMA:"='HR'"

```


### MKDIR

DIR なければ、${ORACLE_HOME}/rdbms/log を探す。

```{.sql}
create or replace directory dir_punp as '/usr1/oradba/pump';
-- grant read,write on directory dir_punp to ORAUSERNAME;
-- commit;
-- drop directory dir_punp
```

</div>


## SCHEMA

```{.bash}
sqlplus /nolog
```

### select all

```{.sql}
conn system/manager@DBNAME as sysdba
--
select username from dba_users;
```

### NOT DEFAULTS

たぶん


```{.sql}
conn system/manager@DBNAME as sysdba
--
select username from DBA_USERS
where
    initial_rsrc_consumer_group != 'SYS_GROUP'
and default_tablespace not like 'SYS%'
and account_status = 'OPEN';
```




## NAMES

### global db

```{.sql}
select * from global_name;
```


### DB

```{.sql}
select sys_context('USERENV','db_name') from dual;
```

### instance

```{.sql}
select sys_context('USERENV','instance_name') from dual;
```

### current user

```{.sql}
select user from dual;
```


## PROC

PROC        NAME              WHAT
----------- ---------------  --------------------------
ora_j       ?                 ジョブ関連
ora_smon    システムモニタ   インスタンス回復、デフラグ
ora_dbw     ?                バッファ・キャッシュからデータファイルへの書込み
ora_lsm     ?                 ?
ora_mmon    管理モニタ?       ?
ora_cjq     ?                 ?


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

<script>window.addEventListener('load', function () {
new Vue({el:'#app-sql',data:{label:''
,ORA_TAB_NAME: 'TABNAME'
}});})</script>

<div id="app-sql">
<form class="form-horizontal">
<varin label="TAB NAME"     v-model="ORA_TAB_NAME"></varin>
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
      where table_name = '" + {{ORA_TAB_NAME}} + "' and constraint_type = 'P'
)
```

</div>

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

-- database link
select
  dbms_metadata.get_ddl (
     'db_link'
   , <OBJECT_NAME>
   , 'public'
  )
from
  dual
;
```

``` {.sql}
CONNECT sys/manager@DBNAME AS SYSDBA
SET ECHO ON
SET SERVEROUTPUT ON
BEGIN
for obj in (select replace(OBJECT_TYPE,' ', '_') as OBJECT_TYPE, OBJECT_NAME, OWNER from dba_objects where OWNER='OWNNAME' and OBJECT_TYPE != 'DATABASE LINK') loop
    DBMS_OUTPUT.PUT_LINE('{TYPE:' || obj.OBJECT_TYPE || ' ,NAME:' || obj.OBJECT_NAME || ', OWNER:' || obj.OWNER || '}');
    for rec in (select dbms_metadata.get_ddl(obj.OBJECT_TYPE, obj.OBJECT_NAME, obj.OWNER) as ddl from dual) loop
        DBMS_OUTPUT.PUT_LINE(rec.ddl);
    end loop;
end loop;
END;
/
exit
```


## MULTI MASTER REPLICATION

<script>window.addEventListener('load', function () {
new Vue({el:'#app-ora-mmr',data:{label:''
,ORA_REPSITE_A: 'AAA'
,ORA_REPSITE_B: 'BBB'
,ORA_REPTNSNAME: 'DB'
,ORA_REP_TABNAME: 'TABLENAME'
}});})</script>

<div id="app-ora-mmr">
<form class="form-horizontal">
<varin label="SITE A"  v-model="ORA_REPSITE_A"></varin>
<varin label="SITE B"  v-model="ORA_REPSITE_B"></varin>
<varin label="TNS"     v-model="ORA_REPTNSNAME"></varin>
<varin label="TABLE"   v-model="ORA_REP_TABNAME"></varin>
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
-- conn repadmin/repadmin@{{ORA_REPSITE_A}}_{{ORA_REPTNSNAME}}

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

</div>
