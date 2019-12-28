<template>
    <div class="Help">
        <h1>Help</h1>
        <hr />

        <p>
            electronとvueで作成されたマークダウンエディターです
        </p>

        <h2>&lt;主な機能&gt;</h2>
        <section class="mt-2">
        <h2>
            <img src="~@/assets/navi-img/edit.svg" class="icon">
            Edit:
        </h2>
        <ul>
            <li>通常</li>
            <p>
                左側に入力欄、右にマークダウン変換後のプレビューになっており、
                入力側をスクロールすると、プレビュー側も動きます
            </p>
            <li>スライドモード</li>
            <p>
                左側が入力欄であるのは変わりませんが、右側がスライドモードになります。
                <code>```</code>や<code>***</code>を区切りとして、一枚のスライドを構成します。<br>
                また、スライドの<code>「」</code>ボタンを押すことでフルスクリーンにすることもできます
            </p>
            <table class="mt-4 col-8 table table-bordered" >
                    <thead class="thead-light">
                        <tr>
                        <th>ショートカットキー</th>
                        <th>機能</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>shift + p</th>
                            <th>スライドのいずれかのUIに触った状態で押すと1つ前に戻ります</th>
                        </tr>
                        <tr>
                            <th>shift + n</th>
                            <th>スライドのいずれかのUIに触った状態で押すと1つ後に進みます</th>
                        </tr>
                        <tr>
                            <th>フルスクリーン状態でesc</th>
                            <th>フルスクリーンの解除</th>
                        </tr>
                        <tr>
                            <th>入力欄をクリックした状態で<br>shift + h</th>
                            <th>入力欄にmarkdownのチートシートが上書きされます</th>
                        </tr>
                    </tbody>
                </table>
        </ul>
        </section>

         <section class="mt-2">
        <h2>
            <img src="~@/assets/navi-img/folder.svg" class="icon">
            File:
        </h2>
        <p>

        </p>
        </section>

         <section class="mt-2">
        <h2>
            <img src="~@/assets/navi-img/settings.svg" class="icon">
            Setting:
        </h2>
        <p>

        </p>
        </section>
    </div>
</template>

<script>
export default {
  name: 'Help'
}
</script>

<style scoped>
  .icon {
      height: 30px;
      width: 30px;
  }
</style>