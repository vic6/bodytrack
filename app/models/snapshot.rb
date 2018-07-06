class Snapshot < ApplicationRecord
  belongs_to :user
  has_many :stats
  accepts_nested_attributes_for :stats
  # default_scope -> { order(created_at: :desc) }
  # validates :picture, presence: true
  mount_uploader :picture, PictureUploader
end
