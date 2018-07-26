class Snapshot < ApplicationRecord
  belongs_to :user
  # has_one :stats
  # accepts_nested_attributes_for :stats
  # validates :picture, presence: true
  mount_uploader :picture, PictureUploader
end
