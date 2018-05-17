# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
vic = User.create!(username: 'vic', email: 'vic@vic.com', password: 'password')
bob = User.create!(username: 'bob', email: 'bob@bob.com', password: 'password')
ted = User.create!(username: 'ted', email: 'ted@ted.com', password: 'password')

puts "#{User.count} users created!"

Character.create!(user: vic, name: 'Trapoholic', description: 'A person who likes to trap')
Character.create!(user: vic, name: 'Sauce Boss', description: 'Sauce is boss')
Character.create!(user: vic, name: 'Rick Ross', description: 'I eat snacks, uggggh')

Character.create!(user: bob, name: 'Chap Lipman', description: 'Member of The Beets')
Character.create!(user: bob, name: 'Kickin Wing', description: 'Joes right hand man')
Character.create!(user: bob, name: 'Joe Dirt', description: 'Janitor extraordinaire')

Character.create!(user: ted, name: 'A Bay Bay', description: 'What I holler in the club')
Character.create!(user: ted, name: 'Patrick', description: 'Dumb starfish')
Character.create!(user: ted, name: 'Mr.Salt', description: 'Single father, has a daughter named Paprika')

puts "#{Character.count} characters created!"
