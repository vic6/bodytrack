FactoryBot.define do
  factory :user do
    username 'vic'
    email 'vicrulez@vic.com'
    password 'password'
  end

  factory :snapshot do
    user
    weight '200'
    neck_size '24'
    waist_size '34'
    chest_size '49'
    hip_size '44'
    note 'hello'
  end
end
