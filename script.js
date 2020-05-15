// ==UserScript==
// @name         RedFox PostMaker VK
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  PostMaker for VK
// @author       FLomka @RedFox
// @match        https://vk.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/FFLomka/PostMaker/master/script.js
// ==/UserScript==

(function() {
	'use strict'
	let tag = ["#новости@redfoxt","#халява@redfoxt", "#скидки@redfoxt", "#игры@redfoxt", "#Steam", "#EpicGames", "#Origin", "#XBOX", "#PlayStation", "#EA", "#Blizzard", "#Ubisoft", "#Riot"]
	let open = false
	let field = document.querySelector('#post_field')
	let posts = document.querySelector('#post_actions_btns')

	let tags = document.createElement('div')
	tags.id = 'post_tags'
	tags.className = 'post_action_btn'

	let tags_layout = document.createElement('div')
	tags_layout.className = 'post_action_btn_layout'

	let span = document.createElement('span') //<span class="post_action_btn_text" role="button" data-empty="Тематика" aria-label="Тематика">Тематика</span>
	span.className = 'post_action_btn_text'
	span.role = 'button'
	span.setAttribute('data-empty', 'Теги')
	span.setAttribute('aria-label', 'Теги')
	span.addEventListener('click', spanser)
	span.innerHTML = 'Теги'

	tags_layout.append(span)

	let list = document.createElement('div')
	list.className = 'eltt eltt_fancy eltt_fancy_actions eltt_arrow_size_normal eltt_align_left eltt_bottom'
	list.id = 'post_list_tag'
	list.style.display = 'none'
	for (let i = 0; i < tag.length; i++) {
		let item = document.createElement('div')
		item.className = 'eltt_fancy_action radiobtn'
		item.role = 'button'
		item.setAttribute('aria-label', tag[i])
		item.addEventListener("click", function(){
			clickOnTag(tag[i])
		}, false)
		item.innerHTML = tag[i]
		list.append(item)
	}

	tags_layout.append(list)

	tags.append(tags_layout)
	posts.append(tags)

	let count = document.createElement('div')
	count.id = 'post_count'
	count.className = 'post_action_btn'

	let count_layout = document.createElement('div')
	count_layout.className = 'post_action_btn_layout'

	let span2 = document.createElement('span')
	span2.className = 'post_action_btn_text'
	span2.id = 'post_counter'
	span2.role = 'button'
	span2.setAttribute('data-empty', 'Счетчик')
	span2.setAttribute('aria-label', 'Счетчик')
	span2.innerHTML = '0'

	count_layout.append(span2)

	count.append(count_layout)
	posts.append(count)
	counter()
	function counter() {
		let count = document.querySelector('#post_counter')
		count.style.color = field.innerHTML.length > 350 ? '#f33' : '#fff'
		count.innerHTML = field.innerHTML.length
		setTimeout(counter, 50)
	}

	function spanser() {
		let lists = document.querySelector('#post_list_tag')
        lists.classList.add('eltt_vis')
		lists.style.display = open ? 'none' : 'block'
		open = !open
	}

	function clickOnTag(tag) {
		field.innerHTML += ' ' + tag
	}

})();