FactoryBot.define do
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

FactoryBot.define do
  factory :user do
    username 'vic'
    height '150'
    units_of_measurement 'metric'
    email 'vicrulez@vic.com'
    password 'password'

    factory :user_with_snapshots do
      transient do
        snapshots_count 10
      end

      after(:create) do |user, evaluator|
        create_list(:snapshot, evaluator.snapshots_count, user: user)
      end
    end
  end
end
